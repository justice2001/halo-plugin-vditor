import type { Schema } from "@/type/editor";

const schema: Schema = {
  type: "template",
  id: "joe-progress",
  icon: "",
  name: "Joe Progress Bar",
  formKit: [
    {
      $formkit: "text",
      name: "percentage",
      label: "Percentage",
      help: "This is the percentage for progress bar.",
      value: "0%",
    },
    {
      $formkit: "color",
      name: "color",
      label: "Color",
      help: "This is the color for progress bar.",
      value: "#ffffff",
    },
  ],
  template: '<joe-progress percentage="$percentage$" color="$color$"></joe-progress>',
};

export default schema;
