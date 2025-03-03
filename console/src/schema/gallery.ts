import type { Schema, SchemaData } from "@/type/editor";
import { t } from "@/utils/i18n-utils";

const schema: Schema = {
  type: "template",
  id: "gallery",
  icon: "",
  name: t("insert_gallery"),
  formKit: [
    {
      $formkit: "select",
      name: "type",
      label: t("type"),
      value: "grid",
      options: [
        {
          label: t("grid"),
          value: "grid",
        },
        {
          label: t("linear"),
          value: "linear",
        },
      ],
    },
    {
      $formkit: "text",
      name: "title",
      label: t("title"),
      value: "",
    },
    {
      $formkit: "repeater",
      name: "attachments",
      label: t("image_group"),
      min: 1,
      value: [{}],
      children: [
        {
          $formkit: "attachment",
          name: "attachment",
          label: t("image"),
          accepts: ["image/*"],
          value: "",
        },
        {
          $formkit: "text",
          name: "attach_title",
          label: t("image_alt"),
          value: "",
          placeholder: t("image_alt_ph"),
        },
      ],
    },
  ],
  handler: (data: SchemaData) => {
    // title type list[]
    const galleryData = data as GallerySchemaData;
    let html = `\`\`\`halo\ngallery:${galleryData.type}`;
    if (galleryData.title) {
      html += `[${galleryData.title}]`;
    }
    html += "\n";
    galleryData.attachments?.forEach((att) => {
      let title: string;
      if (att.attach_title) {
        title = att.attach_title;
      } else {
        const start = att.attachment.lastIndexOf("/");
        const end = att.attachment.lastIndexOf(".");
        title = att.attachment.slice(start, end);
      }
      html += `![${title}](${att.attachment})\n`;
    });
    html += "```";
    return html;
  },
};

export interface GallerySchemaData extends SchemaData {
  title: string;
  type: "grid" | "linear";
  attachments: Array<{
    attachment: string;
    attach_title?: string;
  }>;
}

export default schema;
