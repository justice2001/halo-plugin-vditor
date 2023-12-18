<script setup lang="ts">
import Vditor from "@zhengyi/vditor";
import { onMounted, ref } from "vue";
import "vditor/dist/index.css";
import type { EditorConfig } from "@/type/editor";
import { getOptions } from "@/utils/vditor-utils";
import type { AttachmentLike } from "@halo-dev/console-shared";

const props = withDefaults(
  defineProps<{
    raw?: string;
    content: string;
  }>(),
  {
    raw: "",
    content: "",
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
