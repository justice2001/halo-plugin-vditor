import type { Schema } from "@/type/editor";
import {t} from "@/utils/i18n-utils";

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
      options: {
        default: t("default"),
        info: t("info"),
        success: t("success"),
        warn: t("warning"),
        danger: t("danger"),
      },
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
