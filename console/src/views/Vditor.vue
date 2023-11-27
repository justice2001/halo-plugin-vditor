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

const vditor = ref()
const vditorRef = ref()

const emit = defineEmits<{
  (event: "update:raw", value: string): void;
  (event: "update:content", value: string): void;
  (event: "update", value: string): void;
}>();

const debounceOnUpdate = () => {
  emit("update:raw", vditor.value.getValue());
  emit("update:content", vditor.value.getHTML() || "");
  emit("update", vditor.value.getValue());
}

onMounted(() => {
  vditor.value = new Vditor(vditor.value, {
    height: "calc(100vh - 56px)",
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
    },
    after: () => {
      vditor.value.setValue(props.raw || "# Title Here")
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
  <div id="vditor" ref="vditorRef"></div>
</template>
