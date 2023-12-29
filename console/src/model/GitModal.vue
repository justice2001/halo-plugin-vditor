<script setup lang="ts">
import { VModal, VButton, VSpace } from "@halo-dev/components";
import { t } from "@/utils/i18n-utils";
import { ref } from "vue";

const URL_NOT_SHOW = ["github"];

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  (event: "done", value: string): void;
  (event: "close"): void;
}>();

const url = ref("");
const platform = ref("github");
const owner = ref("");
const repo = ref("");

const generateCode = () => {
  emit(
    "done",
    "\n\n```halo\n" +
      `git:[${url.value}@${platform.value}/${owner.value}/${repo.value}]` +
      "\n```\n\n"
  );
};
</script>

<template>
  <VModal
    :visible="props.open"
    :layer-closable="false"
    :title="t('insert_git')"
    @close="emit('close')"
  >
    <v-space align="start" direction="column" spacing="xs" style="width: 100%">
      <label v-if="URL_NOT_SHOW.indexOf(platform) === -1" for="url">
        <span>URL</span>
        <input id="url" v-model="url" type="text" class="vditor-mde-input" />
      </label>
      <label for="type" class="vditor-mde-label">
        <span>{{ t("platform") }}</span>
        <select id="platform" v-model="platform" class="vditor-mde-select">
          <option value="github">GitHub</option>
          <option value="gitea">Gitea</option>
        </select>
      </label>
      <label for="owner" class="vditor-mde-label">
        <span>{{ t("owner") }}</span>
        <input id="owner" v-model="owner" type="text" class="vditor-mde-input" />
      </label>
      <label for="repo" class="vditor-mde-label">
        <span>{{ t("repo") }}</span>
        <input id="repo" v-model="repo" type="text" class="vditor-mde-input" />
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

<style scoped></style>
