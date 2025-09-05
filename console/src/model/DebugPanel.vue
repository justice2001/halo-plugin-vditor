<template>
  <div id="vditor-debug-panel">
    <div id="vditor-debug-op" :class="{ active: debugOpOpen }">
      <div id="vditor-debug-op-bar" @click="debugOpOpen = !debugOpOpen">
        <img src="../assets/debug.svg" alt="DEBUG" />
      </div>
      <VButton type="primary" size="sm" @click="getRaw">Get Raw</VButton>
      <VButton type="primary" size="sm" @click="getHTML">Get HTML</VButton>
      <VButton type="primary" size="sm" @click="getRenderList"> Get Vditor Options </VButton>
      <VButton type="primary" size="sm" @click="getPluginConfig"> Get Plugin Config </VButton>
      <VButton type="primary" size="sm" @click="getCursor"> Get Last Cursor </VButton>
    </div>
    <div v-if="false" id="vditor-debug-data">
      <div>Vditor DEBUG</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditorConfig } from "@/utils/config-utils";
import { renderHTML } from "@/utils/vditor-utils";
import { VButton } from "@halo-dev/components";
import type Vditor from "vditor";
import { defineProps, ref } from "vue";

const debugOpOpen = ref<boolean>(false);

const props = defineProps<{
  vditor?: Vditor;
  config: EditorConfig | undefined;
  cursor: Range | undefined;
}>();

const getRaw = () => {
  if (!props.vditor) return;
  console.log("RAW: ", props.vditor?.getValue());
};

const getHTML = () => {
  if (!props.vditor) return;
  console.log("HTML", renderHTML(props.vditor));
};

const getRenderList = () => {
  if (!props.vditor) return;
  console.log("RENDER LIST", props.vditor.vditor.options);
};

const getPluginConfig = () => {
  if (props.config) {
    console.log("CONFIG: ", props.config);
  }
};

const getCursor = () => {
  if (props.cursor) {
    console.log("LAST CURSOR", props.cursor);
  }
};
</script>

<style scoped>
#vditor-debug-panel {
  z-index: 9999;
}

#vditor-debug-op {
  position: fixed;
  padding: 10px;
  z-index: 9999;
  background-color: #999;
  border-radius: 5px 0 0 5px;
  right: 0;
  top: 50%;
  transform: translateY(-50%) translateX(100%);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#vditor-debug-op-bar {
  content: "";
  position: absolute;
  width: 26px;
  height: 35px;
  background-color: #999;
  left: -26px;
  border-radius: 5px 0 0 5px;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#vditor-debug-op-bar img {
  width: 16px;
}

#vditor-debug-op.active {
  transform: translateY(-50%) translateX(0);
}

#vditor-debug-data {
  position: fixed;
  left: 10px;
  top: 10px;
  background-color: #000000cc;
  color: #ffffff;
  z-index: 9999;
  padding: 10px;
}
</style>
