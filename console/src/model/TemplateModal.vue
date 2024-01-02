<script setup lang="ts">
import { FormKit, FormKitSchema } from "@formkit/vue";
import { ref, watch } from "vue";
import { t } from "@/utils/i18n-utils";
import { VButton, VModal, VSpace } from "@halo-dev/components";
import type { Schema } from "@/type/editor";

const data = ref<{ [key: string]: string }>({});
const loadKey = ref("");

const props = defineProps<{
  open: boolean;
  schema: Schema;
}>();
const emit = defineEmits<{
  (event: "done", value: string | null): void;
  (event: "close"): void;
}>();

const generateCode = () => {
  if (props.schema.template) {
    let code = props.schema.template || "";
    const formkit = props.schema.formKit;
    formkit.forEach((form: { [key: string]: string }) => {
      code = code.replace(
        `$${form.name}$`,
        data.value[form.name] || form.value
      );
    });
    emit("done", "\n\n" + htmlEncode(code) + "\n\n");
    return;
  }
  props.schema.handler && props.schema.handler(data.value);
  emit("done", null);
};

// Fix formkit schema not reload when schema Changed
watch(props, () => {
  if (props.open) {
    loadKey.value = props.schema.name;
  }
});

const htmlEncode = (str: string) => {
  let s = "";
  if (str.length === 0) {
    return "";
  }
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/'/g, "&#39;");
  s = s.replace(/"/g, "&quot;");
  return s;
};
</script>

<template>
  <VModal
    :visible="props.open"
    :layer-closable="false"
    :title="schema.name"
    @close="emit('close')"
  >
    <FormKit v-model="data" type="form">
      <FormKitSchema :key="loadKey" :schema="schema.formKit" :data="data" />
    </FormKit>
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

<style scoped></style>
