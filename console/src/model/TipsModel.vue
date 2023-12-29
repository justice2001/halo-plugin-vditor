<script setup lang="ts">
import { VModal, VButton, VSpace } from "@halo-dev/components";
import { ref } from "vue";
import { t } from "@/utils/i18n-utils";

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  (event: "done", value: string): void;
  (event: "close"): void;
}>();

const type = ref("default");
const content = ref("");

const generateCode = () => {
  emit(
    "done",
    "\n\n```halo\n" + `tips:${type.value}\n${content.value}\n` + "```\n\n"
  );
};
</script>

<template>
  <VModal
    :visible="props.open"
    :layer-closable="false"
    :title="t('insert_tips')"
    @close="emit('close')"
  >
    <v-space align="start" direction="column" spacing="xs" style="width: 100%">
      <label for="type" class="vditor-mde-label">
        <span>{{ t("type") }}</span>
        <select id="type" v-model="type" class="vditor-mde-select">
          <option value="default">{{ t("default") }}</option>
          <option value="danger">{{ t("danger") }}</option>
          <option value="warn">{{ t("warning") }}</option>
          <option value="info">{{ t("info") }}</option>
          <option value="success">{{ t("success") }}</option>
        </select>
      </label>
      <label for="content" class="vditor-mde-label">
        {{ t("content") }}
        <textarea id="content" v-model="content" class="vditor-mde-textarea" />
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
