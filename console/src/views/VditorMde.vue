<script setup lang="ts">
import Vditor from "vditor";
import { onMounted, onUnmounted, ref, watch } from "vue";

import "vditor/dist/index.css";

import DebugPanel from "@/model/DebugPanel.vue";
import TemplateModal from "@/model/TemplateModal.vue";
import joeProgress from "@/schema/joe-progress";
import type { Schema } from "@/type/editor";
import { defaultEditorConfig, type EditorConfig } from "@/utils/config-utils";
import { getCursor, setCursor } from "@/utils/cursor-utils";
import { addStyle } from "@/utils/dom-utils";
import { fetchAllCustomRenderScripts, fetchAllQuickInsert } from "@/utils/fetch-utils";
import { copyAsHTML } from "@/utils/html-utils";
import { quickInsertInject } from "@/utils/quick-insert-utils";
import { getOptions, renderHTML } from "@/utils/vditor-utils";
import type { Attachment } from "@halo-dev/api-client";
import { VLoading } from "@halo-dev/components";
import type { AttachmentLike } from "@halo-dev/console-shared";
import juice from "juice";

const props = withDefaults(
  defineProps<{
    title?: string;
    raw?: string;
    content?: string;
    uploadImage?: (file: File) => Promise<Attachment>;
  }>(),
  {
    title: "",
    raw: "",
    content: "",
    uploadImage: undefined,
  },
);

const vditor = ref<Vditor>();
const vditorRef = ref();
const vditorLoaded = ref(false);
const attachmentSelectorModalShow = ref(false);
const editorConfig = ref<EditorConfig>();
// 特殊插入框， 当前支持none/tips/git
// 自定义插入
const customInsertOpen = ref(false);
const customInsertSchema = ref<Schema>(joeProgress);
let lastSelectionRange: Range | undefined = undefined;
// Image Upload
const imageUploadLock = false;
let allowImageUpload: string[] = [];
// Debug
const debugMode = ref<boolean>(false);
// 防止内部标题更新触发updateContent
const internalTitle = ref<string>("");

const emit = defineEmits<{
  (event: "update:raw", value: string): void;
  (event: "update:content", value: string): void;
  (event: "update", value: string): void;
  (event: "update:title", value: string): void;
}>();

// Watch Title Change
watch(
  () => props.title,
  (val) => {
    // When option disabled or nothing to update
    if (!editorConfig.value?.basic.firstH1AsTitle || internalTitle.value === val) {
      return;
    }
    // Get title
    const vdiVal = vditor.value?.getValue();
    if (vdiVal?.startsWith("# ")) {
      internalTitle.value = val;
      vditor.value?.setValue(vdiVal.replace(/# .*?\n/, `# ${val}\n`));
    }
  },
);

// Update content
const debounceOnUpdate = () => {
  // 解析标题
  let value = vditor.value?.getValue();
  if (!value) return;
  if (editorConfig.value?.basic.firstH1AsTitle && value.startsWith("# ")) {
    // First Line is Title
    const lines = value.match(/^.*/);
    if (!lines) return;
    const firstLine = lines[0];
    console.log(`title is ${firstLine.substring(2)}`);
    internalTitle.value = firstLine.substring(2);
    emit("update:title", internalTitle.value);
    // 删除第一行并清除空行
    value = value.substring(firstLine.length + 2);
  }
  // update content
  emit("update:raw", value);
  emit("update:content", renderHTML(vditor.value, editorConfig.value || defaultEditorConfig) || "");
  emit("update", value);
};

// 选取附件后处理
const attachmentSelect = (attachments: AttachmentLike[]) => {
  setCursor(lastSelectionRange);
  // Reference https://github.com/guqing/willow-mde/blob/4b8e697132f8a8f4b08dd0f92cf10d070cb26793/console/src/components/toolbar/Toolbar.vue#L104
  attachments.forEach((attachment) => {
    if (typeof attachment === "string") {
      vditor.value?.insertValue(`![](${attachment})`);
    } else if ("url" in attachment) {
      vditor.value?.insertValue(`![${attachment.type}](${attachment.url})`);
    } else if ("spec" in attachment) {
      const { displayName } = attachment.spec;
      const { permalink } = attachment.status || {};
      vditor.value?.insertValue(`![${displayName}](${permalink})`);
    }
  });
};

onUnmounted(async () => {
  document.querySelectorAll("script[id^='vditor']").forEach((el) => el.remove());
  document.querySelectorAll("link[id^='vditor']").forEach((el) => el.remove());
  vditorLoaded.value = false;
});

onMounted(async () => {
  // 实验性功能: 获取当前语言
  const lang = localStorage.getItem("locale") || "zh-CN";
  try {
    const response = await fetch("/apis/api.vditor.mczhengyi.top/editor-options");
    editorConfig.value = await response.json();
  } catch {
    // ignore this
    editorConfig.value = defaultEditorConfig;
  }
  if (!editorConfig.value) return;
  // Assign allowImage
  allowImageUpload = allowImageUpload.concat(
    editorConfig.value.extension.allowImageType.split(",").map((i) => i.trim()),
  );
  console.log("ALLOW", allowImageUpload);
  // 禁用HTML代码块隐藏
  if (editorConfig.value.basic.disableHTMLBlockPreview)
    addStyle(
      "[data-type=html-block] pre {display: block!important;}\n" +
        ".vditor-ir__node[data-type=html-block] .vditor-ir__marker {height: auto; width: auto; display: inline;}",
      "vditor-mde-hide-html",
    );
  // Debug Mode
  debugMode.value = editorConfig.value.developer.debugger;
  // Quick Insert Process
  const qil = await fetchAllQuickInsert(editorConfig.value.basic.quickInsertUrl);
  qil.forEach((q) => {
    quickInsertInject(q.inject || [], q.provider);
  });
  // Get all custom render script
  const renderScripts = await fetchAllCustomRenderScripts(editorConfig.value?.basic.customRenders);
  // Create Vditor
  vditor.value = new Vditor(
    vditorRef.value,
    getOptions({
      defaultRenderMode: editorConfig.value.basic.defaultRenderMode,
      typeWriterMode: editorConfig.value.basic.typeWriterMode,
      after: () => {
        let content = "";
        if (props.raw) {
          content = props.raw;
        }
        if (editorConfig.value?.basic.firstH1AsTitle) {
          internalTitle.value = props.title;
          content = `# ${props.title}\n\n` + content;
        }
        vditor.value?.setValue(content);
        vditorLoaded.value = true;
        debounceOnUpdate();
      },
      input: debounceOnUpdate,
      showAttachment: () => {
        lastSelectionRange = getCursor();
        attachmentSelectorModalShow.value = true;
      },
      language: lang,
      codeBlockPreview: editorConfig.value.basic.codeBlockPreview,
      uploadImage: (files: File[]) => {
        console.log("UPLOAD IMAGE");
        if (imageUploadLock) {
          vditor.value?.tip("当前已经存在正在上传的文件，请等待上传完成", 2000);
          return;
        }

        if (!files[0]) {
          vditor.value?.tip("未选择文件或文件无效，请重试", 2000);
          return null;
        }

        // Check extension name
        const extendName = files[0].name.slice(files[0].name.lastIndexOf(".") + 1).toLowerCase();
        if (allowImageUpload.indexOf(extendName) === -1) {
          vditor.value?.tip("不允许上传该类型图片!", 2000);
          return null;
        }
        // Upload
        if (props.uploadImage) {
          vditor.value?.disabled();
          vditor.value?.tip("正在上传图片...", 2000);
          props.uploadImage(files[0]).then((res: Attachment) => {
            if (!res.status) {
              vditor.value?.enable();
              return;
            }
            // Insert Image
            vditor.value?.insertValue(`\n\n![${res.spec.displayName}](${res.status.permalink})\n\n`);
            // Restore cursor
            vditor.value?.enable();
            vditor.value?.focus();
          });
        }
        return null;
      },
      openModal: (schema: Schema) => {
        lastSelectionRange = getCursor();
        customInsertSchema.value = schema;
        customInsertOpen.value = true;
      },
      enableQuickInsert: editorConfig.value.basic.enableQuickInsert,
      quickInsertList: qil,
      config: editorConfig.value,
      customRenders: renderScripts,
      actions: [
        "desktop",
        "mobile",
        "tablet",
        "mp-wechat",
        "zhihu",
        {
          key: "mp-wechat-custom",
          text: "复制到微信公众号（测试版）",
          click: () => {
            const doc = vditor.value?.vditor.preview?.previewElement;
            if (!doc) return;
            const options = vditor.value?.vditor.options;
            if (!options) return;
            // Load vditor css file
            const cdn = options.cdn;
            const themePath = options.preview?.theme?.path || `${cdn}/dist/css/content-theme`;
            const theme = options.preview?.theme?.current || "light";
            const hljsTheme = options.preview?.hljs?.style || "github";
            const css = [
              `${cdn}/dist/index.css`,
              `${themePath}/${theme}.css`,
              `${cdn}/dist/js/highlight.js/styles/${hljsTheme}.min.css`,
              `${cdn}/dist/js/katex/katex.min.css`,
            ];
            Promise.all(css.map((url) => fetch(url).then((res) => res.text()))).then((contentList) => {
              let css = "";
              contentList.forEach((content) => (css += content + "\n\n"));
              doc.querySelectorAll(".katex-html .base").forEach((item: Element) => {
                (item as HTMLElement).style.display = "initial";
              });
              const html = juice(`<div class="vditor-reset">${doc.innerHTML}</div>`, {
                extraCss: css,
              });
              copyAsHTML(html).then(() => {
                vditor.value?.tip("已复制，部分样式可能会丢失！", 2000);
              });
            });
          },
        },
      ],
    }),
  );
});

const update = (val: string | null) => {
  setCursor(lastSelectionRange);
  if (!val) {
    vditor.value?.tip("未知错误，插入失败", 3000);
  } else {
    vditor.value?.focus();
    vditor.value?.insertValue(`${val}`);
  }
  customInsertOpen.value = false;
};
</script>

<template>
  <div id="plugin-vditor-mde" :class="{ h1AsTitle: editorConfig?.basic.firstH1AsTitle }">
    <VLoading v-if="!vditorLoaded" style="height: 100%" />
    <DebugPanel v-if="debugMode" :config="editorConfig" :vditor="vditor" :cursor="lastSelectionRange" />
    <div id="vditor" ref="vditorRef"></div>
    <TemplateModal
      :open="customInsertOpen"
      :schema="customInsertSchema"
      @close="customInsertOpen = false"
      @done="update"
    />

    <AttachmentSelectorModal
      v-model:visible="attachmentSelectorModalShow"
      :accepts="['image/*']"
      :max="1"
      @select="attachmentSelect"
    />
  </div>
</template>

<style>
#plugin-vditor-mde ol {
  list-style: decimal;
}

/** Fix Link color in wysiwyg mode */

#plugin-vditor-mde a {
  color: #3478cd;
}

/** Fix content was covered by vditor panel in wysiwyg mode  */
#plugin-vditor-mde button,
#plugin-vditor-mde input {
  line-height: normal;
}

.insert-modals label {
  width: 100%;
  display: flex;
}

.insert-modals label span {
  width: 60px;
  text-align: right;
}

.insert-modals select {
  border: 1px solid #cccccc;
  border-radius: 3px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 10px;
  flex: 1;
}

.insert-modals textarea {
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin-left: 10px;
  flex: 1;
}

.insert-modals input[type="text"] {
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin-left: 10px;
  flex: 1;
  padding: 8px 10px;
}

/* title */
#plugin-vditor-mde.h1AsTitle .vditor-ir h1:first-child::before,
#plugin-vditor-mde.h1AsTitle .vditor-wysiwyg h1:first-child::before {
  content: "T";
}

#plugin-vditor-mde.h1AsTitle .vditor-ir h1:first-child,
#plugin-vditor-mde.h1AsTitle .vditor-wysiwyg h1:first-child {
  border-bottom: 2px solid #eaecef;
  color: #333333;
  text-align: left;
  text-decoration: none;
  font-size: 2rem;
  background: none;
}

/**
 Fix compatible issues with docsme.
 https://github.com/justice2001/halo-plugin-vditor/issues/38
*/
#plugin-vditor-mde code[class*="language-"],
#plugin-vditor-mde pre[class*="language-"] {
  color: #000000;
}
</style>
