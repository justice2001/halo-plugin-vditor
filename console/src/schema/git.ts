import type { Schema } from "@/type/editor";
import { t } from "@/utils/i18n-utils";

const schema: Schema = {
  type: "template",
  id: "git",
  icon: "",
  name: t("insert_git"),
  formKit: [
    {
      $formkit: "select",
      id: "platform",
      name: "platform",
      label: t("platform"),
      value: "github",
      options: {
        github: "GitHub",
        gitee: "Gitee",
      },
    },
    {
      $formkit: "text",
      name: "url",
      label: "URL",
      value: "",
      if: "false",
    },
    {
      $formkit: "text",
      name: "owner",
      label: t("owner"),
      value: "",
    },
    {
      $formkit: "text",
      name: "repo",
      label: t("repo"),
      value: "",
    },
  ],
  template: "```halo\ngit:[$url$@$platform$/$owner$/$repo$]\n```",
};

export default schema;
