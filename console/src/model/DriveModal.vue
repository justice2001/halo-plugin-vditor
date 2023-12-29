<script setup lang="ts">
import { VModal, VButton, VSpace } from "@halo-dev/components";
import { t } from "@/utils/i18n-utils";
import { ref } from "vue";

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  (event: "done", value: string): void;
  (event: "close"): void;
}>();

const platform = ref("baidu");
const name = ref("");
const link = ref("");
const password = ref("");

const generateCode = () => {
  let code = "\n\n```halo\n";
  code += `drive:${platform.value}\n`;
  code += `name: ${name.value}\n`;
  code += `link: ${link.value}\n`;
  if (password.value) {
    code += `password: ${password.value}\n`;
  }
  emit("done", code + "```\n\n");
};
</script>

<template>
  <VModal
    :visible="props.open"
    :layer-closable="false"
    :title="t('insert_drive')"
    @close="emit('close')"
  >
    <v-space align="start" direction="column" spacing="xs" style="width: 100%">
      <label for="type" class="vditor-mde-label">
        <span>{{ t("platform") }}</span>
        <select id="platform" v-model="platform" class="vditor-mde-select">
          <option value="baidu">{{ t("baidu_net_disk") }}</option>
          <option value="ali">{{ t("ali_drive") }}</option>
        </select>
      </label>
      <label for="name" class="vditor-mde-label">
        <span>{{ t("title") }}</span>
        <input id="name" v-model="name" type="text" class="vditor-mde-input" />
      </label>
      <label for="link" class="vditor-mde-label">
        <span>{{ t("link") }}</span>
        <input id="link" v-model="link" type="text" class="vditor-mde-input" />
      </label>
      <label for="password" class="vditor-mde-label">
        <span>{{ t("password") }}</span>
        <input
          id="password"
          v-model="password"
          type="text"
          class="vditor-mde-input"
        />
      </label>
    </v-space>
    <template #footer>
      <v-space align="center" direction="row" spacing="xs">
        <v-button type="primary" @click="generateCode">
          {{ t("confirm") }}
        </v-button>
        <v-button type="default" @click="emit('close')">
          {{ t("close") }}
        </v-button>
      </v-space>
    </template>
  </VModal>
</template>
