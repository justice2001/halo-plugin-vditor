import drive from "@/schema/drive";
import gallery from "@/schema/gallery";
import git from "@/schema/git";
import hyperlinkCard from "@/schema/hyperlink-card";
import hyperlinkInline from "@/schema/hyperlink-inline";
import tips from "@/schema/tips";
import type { Options, QuickInsert, Schema } from "@/type/editor";
import type { EditorConfig } from "@/utils/config-utils";
import { addScript, addStyleSheet } from "@/utils/dom-utils";
import { t } from "@/utils/i18n-utils";
import { mdiGrid, mdiImage } from "@/utils/icon";
import type { PluginModule } from "@halo-dev/console-shared";
import type Vditor from "vditor";

declare const HaloJs: {
  renderHalo: (content: string, cdn: string) => string;
};

export function getOptions(options: Options): IOptions {
  const cdn = `${window.location.protocol}//${window.location.host}` + `/plugins/vditor-mde/assets/static`;
  console.log(`Your CDN IS: ${cdn}`);
  // Get Toolbar
  const toolbar = getToolbar(options.showAttachment, options.openModal, getLanguage(options.language));
  if (options.enableQuickInsert) {
    options.quickInsertList.forEach((insert: QuickInsert) => {
      toolbar.splice(-1, 0, buildQuickInsertToolbar(options.openModal, insert));
    });
  }
  // Load macros
  const macros = JSON.parse(options.config.basic.macros || "{}");
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
        current: options.config.basic.previewTheme || "light",
        path: options.config.basic.previewThemeBase || `${cdn}/dist/css/content-theme`,
      },
      math: {
        inlineDigit: true,
        macros: macros,
      },
      actions: options.actions,
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
    debugger: options.config.developer.debugger,
    customRenders: getCustomRenders(options),
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
  lang: keyof II18n,
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
      toolbar: getPresetCustomToolbar(openModal),
    },
    {
      name: "more",
      toolbar: ["both", "export", "outline", "info", "help"],
    },
  ];
}

/**
 * 获取预设置的自定义 toolbar
 * @returns toolbar
 */
function getPresetCustomToolbar(openModal: (schema: Schema) => void) {
  const toolbar: (string | IMenuItem)[] = [];
  toolbar.push(
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
    {
      name: "insert_gallery",
      icon: t("insert_gallery"),
      click: () => openModal(gallery),
    },
  );
  // 加入插入超链接卡片的支持
  const hyperlinkCardPlugin = window["editor-hyperlink-card"] as PluginModule;
  if (hyperlinkCardPlugin) {
    console.log("hyperlinkCard plugin is installed and enabled, load custom toolbar");
    // Fix https://github.com/justice2001/halo-plugin-vditor/issues/65
    try {
      hyperlinkCardPlugin?.extensionPoints?.["default:editor:extension:create"]?.();
    } catch (e: unknown) {
      console.error("hyperlink extension execute failed! ", e);
    }
    toolbar.push(
      {
        name: "hyperlink_card",
        icon: t("hyperlink_card"),
        click: () => openModal(hyperlinkCard),
      },
      {
        name: "hyperlink_inline",
        icon: t("hyperlink_inline"),
        click: () => openModal(hyperlinkInline),
      },
    );
  }
  return toolbar;
}

function buildQuickInsertToolbar(openModal: (schema: Schema) => void, quickInsertList: QuickInsert): IMenuItem {
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

/**
 * 获取自定义渲染器
 * @param options
 */
function getCustomRenders(options: Options):
  | {
      language: string;
      render: (element: HTMLElement, vditor: IVditor) => void;
    }[]
  | undefined {
  if (options.config.developer.debugger) {
    console.log("QUICK INSERT: ", options.quickInsertList);
  }
  const renders: {
    language: string;
    render: (element: HTMLElement, vditor: IVditor) => void;
  }[] = [];
  // 启用内置渲染器
  addScript("/plugins/vditor-mde/assets/static/halo-renders/index.js", "halo-render");
  addStyleSheet("/plugins/vditor-mde/assets/static/halo-renders/index.css", "halo-render-css");
  renders.push({
    language: "halo",
    render: (element: HTMLElement) => {
      element.querySelectorAll(".language-halo").forEach((el) => {
        el.outerHTML = HaloJs.renderHalo(el.textContent || "", "/plugins/vditor-mde/assets/static/halo-renders");
      });
    },
  });
  // custom Renders
  for (const script of options.customRenders) {
    try {
      console.debug("Loading custom script: " + script);
      const ext = new Function("return " + script)()();
      console.log("Loading custom script: " + ext.language);
      renders.push({
        language: ext.language,
        render: (element: HTMLElement) => {
          element.querySelectorAll(".language-" + ext.language).forEach((el) => {
            el.outerHTML = ext.render(el.textContent || "");
          });
        },
      });
    } catch (e) {
      console.error("Load custom script failed! " + e);
    }
  }
  console.log("Renders: ", renders);
  return renders;
}

/**
 * 进行自定义渲染器的后处理
 * @param vditor vditor
 * @param config Editor Config, 可选
 * @returns html
 */
export function renderHTML(vditor: Vditor | undefined, config?: EditorConfig): string {
  if (!vditor) return "";
  let value = vditor.getHTML();
  const customRenders = vditor.vditor.options.customRenders;
  customRenders?.forEach((render) => {
    const reg = new RegExp(`<pre><code class="language-${render.language}">(.*?)</code></pre>`, "gs");
    value = value.replace(reg, `<div class="language-${render.language}">$1</div>`);
  });
  // Remove H1 Title When start with "h1"
  if (config?.basic.firstH1AsTitle && value.startsWith("<h1")) {
    value = value.replace(/<h1(?:\s+[^>]*)?>(.*?)<\/h1>/, "");
    console.log(value);
  }
  return value;
}
