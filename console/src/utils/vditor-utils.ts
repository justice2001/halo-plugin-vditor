import type { Options, QuickInsert, Schema } from "@/type/editor";
import { mdiGrid, mdiImage } from "@/utils/icon";
import { t } from "@/utils/i18n-utils";
import tips from "@/schema/tips";
import git from "@/schema/git";
import drive from "@/schema/drive";

export function getOptions(options: Options): IOptions {
  const cdn =
    `${window.location.protocol}//${window.location.host}` +
    `/plugins/vditor-mde/assets/static`;
  console.log(`Your CDN IS: ${cdn}`);
  // Get Toolbar
  const toolbar = getToolbar(
    options.showAttachment,
    options.openModal,
    getLanguage(options.language)
  );
  if (options.enableQuickInsert) {
    options.quickInsertList.forEach((insert: QuickInsert) => {
      toolbar.splice(-1, 0, buildQuickInsertToolbar(options.openModal, insert));
    });
  }
  // Build Options
  return {
    height: "100%",
    mode: options.defaultRenderMode,
    typewriterMode: options.typeWriterMode,
    cdn: cdn,
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
    toolbar: toolbar,
    counter: {
      enable: true,
    },
    preview: {
      markdown: {
        toc: true,
        codeBlockPreview: options.codeBlockPreview,
      },
      theme: {
        current: "light",
        path: `${cdn}/dist/css/content-theme`,
      },
    },
    outline: {
      enable: true,
      position: "left",
    },
    fullscreen: {
      index: 1000,
    },
    upload: {
      handler: options.uploadImage,
    },
  };
}

export function getLanguage(lang = "zh-CN"): keyof II18n {
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
  openModal: (schema: Schema) => void,
  lang: keyof II18n
): (string | IMenuItem)[] {
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
      name: "insert_custom",
      tip: t("insert_custom"),
      icon: mdiGrid,
      tipPosition: "n",
      toolbar: [
        {
          name: "insert_tips",
          icon: t("insert_tips"),
          click: () => openModal(tips),
        },
        {
          name: "insert_git",
          icon: t("insert_git"),
          click: () => openModal(git),
        },
        {
          name: "insert_drive",
          icon: t("insert_drive"),
          click: () => openModal(drive),
        },
      ],
    },
    {
      name: "more",
      toolbar: ["both", "export", "outline", "info", "help"],
    },
  ];
}

function buildQuickInsertToolbar(
  openModal: (schema: Schema) => void,
  quickInsertList: QuickInsert
): IMenuItem {
  const children: IMenuItem[] = [];
  quickInsertList.schema.forEach((sch: Schema) => {
    children.push({
      icon: (sch.icon || "") + sch.name,
      name: sch.id,
      click: () => openModal(sch),
    });
  });
  return {
    name: quickInsertList.name,
    tip: quickInsertList.tip,
    icon: quickInsertList.icon,
    tipPosition: "n",
    toolbar: children,
  };
}
