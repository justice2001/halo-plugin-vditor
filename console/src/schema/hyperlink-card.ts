import type { Schema } from "@/type/editor";
import { t } from "@/utils/i18n-utils";

const schema: Schema = {
  type: "template",
  id: "hyperlink",
  icon: "",
  name: t("hyperlink_card"),
  formKit: [
    {
      $formkit: "select",
      name: "theme",
      label: t("theme"),
      value: "regular",
      options: [
        {
          label: t("hyperlink_regular"),
          value: "regular",
        },
        {
          label: t("hyperlink_small"),
          value: "small",
        },
      ],
    },
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
  template: '<hyperlink-card href="$link$" target="$target$" theme="$theme$"></hyperlink-card>',
};

export default schema;
