import type { Schema } from "@/type/editor";
import { t } from "@/utils/i18n-utils";

const schema: Schema = {
  type: "template",
  id: "hyperlink",
  icon: "",
  name: t("hyperlink_inline"),
  formKit: [
    {
      $formkit: "text",
      name: "link",
      label: t("link"),
      value: "",
    },
    {
      $formkit: "select",
      name: "target",
      label: t("target"),
      value: "_self",
      options: [
        {
          label: "_self",
          value: "_self",
        },
        {
          label: "_blank",
          value: "_blank",
        },
      ],
    },
  ],
  inline: true,
  template: '<hyperlink-inline-card href="$link$" target="$target$"></hyperlink-inline-card>',
};

export default schema;
