import type { Options } from "@/type/editor";
import { mdiImage } from "@/utils/icon";
import { t } from "@/utils/i18n-utils";

export function getOptions(options: Options): IOptions {
  return {
    height: "calc(100vh - 56px)",
    mode: options.defaultRenderMode,
    typewriterMode: options.typeWriterMode,
    icon: "material",
    lang: getLanguage(options.language),
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
    },
    after: options.after,
    input: options.input,
    toolbar: getToolbar(options.showAttachment, getLanguage(options.language)),
    counter: {
      enable: true,
    },
    preview: {
      markdown: {
        toc: true,
        codeBlockPreview: options.codeBlockPreview,
      },
    },
    outline: {
      enable: true,
      position: "left",
    },
    fullscreen: {
      index: 1000,
    },
  };
}

function getLanguage(lang = "zh-CN"): keyof II18n {
  switch (lang) {
    case "zh-CN":
      return "zh_CN";
    case "zh-TW":
      return "zh_TW";
    case "en-US":
      return "en_US";
    case "es":
      return "en_US";
    default:
      return "zh_CN";
  }
}

function getToolbar(
  showAttachmentCb: () => void,
  lang: keyof II18n
): (string | IMenuItem)[] | undefined {
  return [
    "emoji",
    "headings",
    "bold",
    "italic",
    "strike",
    "link",
    "|",
    "list",
    "ordered-list",
    "check",
    "outdent",
    "indent",
    "|",
    "quote",
    "line",
    "code",
    "inline-code",
    "insert-before",
    "insert-after",
    "|",
    {
      name: "attachment",
      icon: mdiImage,
      tip: t("insert_image", lang),
      tipPosition: "n",
      hotkey: "⇧⌘P",
      click: showAttachmentCb,
    },
    "table",
    "|",
    "undo",
    "redo",
    "|",
    "fullscreen",
    "edit-mode",
    {
      name: "more",
      toolbar: ["both", "export", "outline", "info", "help"],
    },
  ];
}
