<script setup lang="ts">
import Vditor from "@zhengyi/vditor";
import { onMounted, onUnmounted, ref } from "vue";
import "@zhengyi/vditor/dist/index.css";
import type { EditorConfig } from "@/type/editor";
import { getOptions } from "@/utils/vditor-utils";
import type { AttachmentLike } from "@halo-dev/console-shared";
import type { Attachment } from "@halo-dev/api-client";

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
const attachmentSelectorModalShow = ref(false);

const emit = defineEmits<{
  (event: "update:raw", value: string): void;
  (event: "update:content", value: string): void;
  (event: "update", value: string): void;
}>();

const debounceOnUpdate = () => {
  emit("update:raw", vditor.value.getValue());
  emit("update:content", vditor.value.getHTML() || "");
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
});

onMounted(async () => {
  let mode: "ir" | "wysiwyg" | "sv" | undefined = "ir";
  let typeWriterMode = false;
  let codeBlockPreview = true;

  // 实验性功能: 获取当前语言
  const lang = localStorage.getItem("locale") || "zh-CN";

  try {
    const response = await fetch(
      "/apis/api.vditor.mczhengyi.top/editor-options"
    );
    const editorConfig: EditorConfig = await response.json();
    mode = editorConfig.basic.defaultRenderMode;
    typeWriterMode = editorConfig.basic.typeWriterMode;
    codeBlockPreview = editorConfig.basic.codeBlockPreview;
  } catch (e) {
    // ignore this
  }
  vditor.value = new Vditor(
    vditorRef.value,
    getOptions({
      defaultRenderMode: mode,
      typeWriterMode: typeWriterMode,
      after: () => {
        vditor.value.setValue(props.raw || "# Title Here");
      },
      input: debounceOnUpdate,
      showAttachment: () => (attachmentSelectorModalShow.value = true),
      language: lang,
      codeBlockPreview: codeBlockPreview,
      uploadImage: (files: File[]) => {
        const acceptType = ["png", "jpg", "jpeg", "bmp", "gif", "webp", "svg"];
        const extendName = files[0].name
          .slice(files[0].name.lastIndexOf(".") + 1)
          .toLowerCase();
        if (acceptType.indexOf(extendName) === -1) {
          vditor.value.tip("不允许上传该类型图片!", 2000);
          return null;
        }
        if (props.uploadImage) {
          vditor.value.tip("正在上传图片...", 2000);
          props.uploadImage(files[0]).then((res: Attachment) => {
            vditor.value.insertValue(
              `\n\n![${res.spec.displayName}](${res.status.permalink})\n\n`
            );
          });
        }
        return null;
      },
    })
  );
});
</script>

<template>
  <div id="plugin-vditor-mde">
    <div id="vditor" ref="vditorRef"></div>

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

/** Fix content was covered by vditor panel in wysiwyg mode  */
#plugin-vditor-mde button,
#plugin-vditor-mde input {
  line-height: normal;
}
</style>
