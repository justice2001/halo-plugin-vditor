import type { Schema } from "@/type/editor";
import { t } from "@/utils/i18n-utils";

const schema: Schema = {
  type: "template",
  id: "tips",
  icon: "",
  name: t("insert_tips"),
  formKit: [
    {
      $formkit: "select",
      name: "type",
      label: t("type"),
      help: "This is the percentage for progress bar.",
      value: "default",
      options: [
        {
          label: t("default"),
          value: "default",
        },
        {
          label: t("info"),
          value: "info",
        },
        {
          label: t("success"),
          value: "success",
        },
        {
          label: t("warning"),
          value: "warn",
        },
        {
          label: t("danger"),
          value: "danger",
        },
      ],
    },
    {
      $formkit: "textarea",
      name: "content",
      label: t("content"),
      value: "",
    },
  ],
  template: "```halo\n" + `tips:$type$\n$content$\n` + "```",
};

export default schema;
