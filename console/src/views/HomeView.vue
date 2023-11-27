<script setup lang="ts">
import Vditor from "vditor";
import {onMounted, ref} from "vue";
import "vditor/dist/index.css"

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

const content = ref()
const vditor = ref()

const emit = defineEmits<{
  (event: "update:raw", value: string): void;
  (event: "update:content", value: string): void;
  (event: "update", value: string): void;
}>();

const debounceOnUpdate = () => {
  emit("update:raw", content.value.getValue());
  emit("update:content", content.value.getHTML() || "");
  emit("update", content.value.getValue());
}

type EditorConfig = {
  basic: {
    enable_render: boolean;
    defaultRenderMode: "ir" | "wysiwyg" | "sv" | undefined;
  };
};

onMounted(async () => {
  let mode: "ir" | "wysiwyg" | "sv" | undefined = "ir"
  try {
    const response = await fetch(
      "/apis/api.vditor.mczhengyi.top/editor-options"
    );
    const editorConfig: EditorConfig = await response.json();
    mode = editorConfig.basic.defaultRenderMode
  } catch (e) {
    // ignore this
  }
  content.value = new Vditor(vditor.value, {
    height: "calc(100vh - 56px)",
    mode: mode,
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
    },
    after: () => {
      content.value.setValue(props.raw || "# Title Here")
    },
    input: (value: string) => {
      debounceOnUpdate()
    },
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "|",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullscreen",
      "edit-mode",
      {
        name: "more",
        toolbar: [
          "both",
          "export",
          "outline",
          "info",
          "help"
        ],
      },],
    counter: {
      enable: true
    },
    preview: {
      markdown: {
        toc: true
      }
    },
    outline: {
      enable: true,
      position: "left"
    },
  })
})

</script>

<template>
  <div id="plugin-starter">
    <div id="vditor" ref="vditor"></div>
  </div>
</template>

<style lang="scss" scoped>
#plugin-starter {
  background-color: #f8fafc;
  font-size: 20px;
}
</style>
