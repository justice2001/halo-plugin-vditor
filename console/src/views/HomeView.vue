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

onMounted(() => {
  console.log(vditor)
  content.value = new Vditor(vditor.value, {
    height: "calc(100vh - 56px)",
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
    }
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
