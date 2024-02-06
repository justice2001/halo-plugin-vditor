<template>
  <div id="vditor-debug-panel">
    <VButton type="primary" @click="getHTML">Get HTML</VButton>
  </div>
</template>

<script setup lang="ts">
import { renderHTML } from "@/utils/vditor-utils";
import { VButton } from "@halo-dev/components";
import type Vditor from "vditor";
import { defineProps } from "vue";

const props = defineProps<{
  vditor: Vditor | null;
}>();

const getHTML = () => {
  if (!props.vditor) return;
  console.log("HTML", renderHTML(props.vditor));
}
</script>
