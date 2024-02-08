<script setup lang="ts">
import Vditor from "vditor";
import { onMounted, onUnmounted, ref } from "vue";
import "vditor/dist/index.css";
import type { Schema } from "@/type/editor";
import { getOptions, renderHTML } from "@/utils/vditor-utils";
import type { AttachmentLike } from "@halo-dev/console-shared";
import type { Attachment } from "@halo-dev/api-client";
import { VLoading } from "@halo-dev/components";
import TemplateModal from "@/model/TemplateModal.vue";
import joeProgress from "@/schema/joe-progress";
import { fetchAllQuickInsert } from "@/utils/fetch-utils";
import { quickInsertInject } from "@/utils/quick-insert-utils";
import { addStyle } from "@/utils/dom-utils";
import { getCursor, setCursor } from "@/utils/cursor-utils";
import { defaultEditorConfig, type EditorConfig } from "@/utils/config-utils";
import DebugPanel from "@/model/DebugPanel.vue";

const props = withDefaults(
  defineProps<{
    raw?: string;
    content: string;
    uploadImage?: (file: File) => Promise<Attachment>;
  }>(),
  {
    raw: "",
    content: "",
    uploadImage: undefined,
  }
);

const vditor = ref();
const vditorRef = ref();
const vditorLoaded = ref(false);
const attachmentSelectorModalShow = ref(false);
// 特殊插入框， 当前支持none/tips/git
// 自定义插入
const customInsertOpen = ref(false);
const customInsertSchema = ref<Schema>(joeProgress);
let lastSelectionRange: Range | undefined = undefined;
// Image Upload
let imageUploadCursor: Range | undefined;
const imageUploadLock = false;
let allowImageUpload: string[] = [];
// Debug
const debugMode = ref<boolean>(false);

const emit = defineEmits<{
  (event: "update:raw", value: string): void;
  (event: "update:content", value: string): void;
  (event: "update", value: string): void;
}>();

const customRenderList = ["halo"];

const debounceOnUpdate = () => {
  emit("update:raw", vditor.value.getValue());
  emit("update:content", renderHTML(vditor.value) || "");
  emit("update", vditor.value.getValue());
};

// 选取附件后处理
const attachmentSelect = (attachments: AttachmentLike[]) => {
  // Reference https://github.com/guqing/willow-mde/blob/4b8e697132f8a8f4b08dd0f92cf10d070cb26793/console/src/components/toolbar/Toolbar.vue#L104
  attachments.forEach((attachment) => {
    if (typeof attachment === "string") {
      vditor.value.insertValue(`![](${attachment})`);
    } else if ("url" in attachment) {
      vditor.value.insertValue(`![${attachment.type}](${attachment.url})`);
    } else if ("spec" in attachment) {
      const { displayName } = attachment.spec;
      const { permalink } = attachment.status || {};
      vditor.value.insertValue(`![${displayName}](${permalink})`);
    }
  });
};

onUnmounted(async () => {
  document
    .querySelectorAll("script[id^='vditor']")
    .forEach((el) => el.remove());
  document.querySelectorAll("link[id^='vditor']").forEach((el) => el.remove());
  vditorLoaded.value = false;
});

onMounted(async () => {
  // 实验性功能: 获取当前语言
  const lang = localStorage.getItem("locale") || "zh-CN";
  let editorConfig: EditorConfig;
  try {
    const response = await fetch(
      "/apis/api.vditor.mczhengyi.top/editor-options"
    );
    editorConfig = await response.json();
  } catch (e) {
    // ignore this
    editorConfig = defaultEditorConfig;
  }
  // Assign allowImage
  allowImageUpload = allowImageUpload.concat(
    editorConfig.extension.allowImageType.split(",").map((i) => i.trim())
  );
  console.log("ALLOW", allowImageUpload);
  // 禁用HTML代码块隐藏
  if (editorConfig.basic.disableHTMLBlockPreview)
    addStyle(
      "[data-type=html-block] pre {display: block!important;}\n" +
        ".vditor-ir__node[data-type=html-block] .vditor-ir__marker {height: auto; width: auto; display: inline;}",
      "vditor-mde-hide-html"
    );
  // Debug Mode
  debugMode.value = editorConfig.developer.debugger;
  // Quick Insert Process
  const qil = await fetchAllQuickInsert(editorConfig.basic.quickInsertUrl);
  qil.forEach((q) => {
    quickInsertInject(q.inject || [], q.provider);
  });
  // Create Vditor
  vditor.value = new Vditor(
    vditorRef.value,
    getOptions({
      defaultRenderMode: editorConfig.basic.defaultRenderMode,
      typeWriterMode: editorConfig.basic.typeWriterMode,
      after: () => {
        vditor.value.setValue(props.raw || "# Title Here");
        vditorLoaded.value = true;
      },
      input: debounceOnUpdate,
      showAttachment: () => (attachmentSelectorModalShow.value = true),
      language: lang,
      codeBlockPreview: editorConfig.basic.codeBlockPreview,
      uploadImage: (files: File[]) => {
        console.log("UPLOAD IMAGE");
        if (imageUploadLock) {
          vditor.value.tip("当前已经存在正在上传的文件，请等待上传完成", 2000);
          return;
        }
        // Save cursor
        imageUploadCursor = getCursor();
        // Check extension name
        const extendName = files[0].name
          .slice(files[0].name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (allowImageUpload.indexOf(extendName) === -1) {
          vditor.value.tip("不允许上传该类型图片!", 2000);
          return null;
        }
        // Upload
        if (props.uploadImage) {
          vditor.value.tip("正在上传图片...", 2000);
          props.uploadImage(files[0]).then((res: Attachment) => {
            if (!res.status) return;
            vditor.value.disabled();
            // Move cursor
            const tmpCursor = getCursor();
            setCursor(imageUploadCursor);
            imageUploadCursor = undefined;
            // Insert
            vditor.value.insertValue(
              `\n\n![${res.spec.displayName}](${res.status.permalink})\n\n`
            );
            // Restore cursor
            setCursor(tmpCursor);
            vditor.value.enable();
          });
        }
        return null;
      },
      openModal: (schema: Schema) => {
        lastSelectionRange = getCursor();
        customInsertSchema.value = schema;
        customInsertOpen.value = true;
      },
      enableQuickInsert: editorConfig.basic.enableQuickInsert,
      quickInsertList: qil,
      config: editorConfig,
    })
  );
});

const update = (val: string | null) => {
  setCursor(lastSelectionRange);
  if (!val) {
    vditor.value.tip("未知错误，插入失败", 3000);
  } else {
    vditor.value.focus();
    vditor.value.insertValue(`\n\n${val}\n\n`);
  }
  customInsertOpen.value = false;
};
</script>

<template>
  <div id="plugin-vditor-mde">
    <VLoading v-if="!vditorLoaded" style="height: 100%" />
    <DebugPanel v-if="debugMode" :vditor="vditor" />
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
</style>
