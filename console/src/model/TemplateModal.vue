<script setup lang="ts">
import type { Schema } from "@/type/editor";
import { t } from "@/utils/i18n-utils";
import { VButton, VModal, VSpace } from "@halo-dev/components";
import { ref, watch } from "vue";

const data = ref<{ [key: string]: string }>({});
const loadKey = ref("");
let idCount = 0;

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
    formkit.forEach((form: { name: string; value: string; [key: string]: string }) => {
      code = code.replace(`$${form.name}$`, data.value[form.name] || form.value);
    });
    if (!props.schema.inline) code = "\n\n" + code + "\n\n";
    emit("done", htmlEncode(code));
    return;
  }

  emit("done", (props.schema.handler && props.schema.handler(data.value)) || null);
};

// 修改FormKit ID来实现Schema重载
watch(props, (val, old) => {
  if (props.open) {
    if (old.schema.id === val.schema.id) {
      loadKey.value = `${val.schema.id}-${idCount++}`;
    } else {
      idCount = 0;
      loadKey.value = props.schema.id;
    }
    console.log("This Load Key: " + loadKey.value);
    props.schema.formKit.forEach((form: { name: string; value: string; [key: string]: string }) => {
      data.value[form.name] = form.value;
    });
  }
});

const htmlEncode = (str: string) => {
  let s = "";
  if (str.length === 0) {
    return "";
  }
  s = str.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/"/g, "&quot;");
  return s;
};
</script>

<template>
  <VModal :visible="props.open" :layer-closable="false" :title="schema.name" @close="emit('close')">
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
