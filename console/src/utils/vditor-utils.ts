import type {Options} from "@/type/editor";
import {mdiImage} from "@/utils/icon";

export function getOptions(options: Options): IOptions {
  return {
    height: "calc(100vh - 56px)",
    mode: options.defaultRenderMode,
    typewriterMode: options.typeWriterMode,
    icon: "material",
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
    },
    after: options.after,
    input: options.input,
    toolbar: getToolbar(options.showAttachment),
    counter: {
      enable: true
    },
    preview: {
      markdown: {
        toc: true
      }
    },
    outline: {
      enable: true,
      position: "left"
    },
    fullscreen: {
      index: 1000
    }
  }
}

function getToolbar(showAttachmentCb: () => void): (string | IMenuItem)[] | undefined {
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
      tip: "插入图片",
      tipPosition: "n",
      hotkey: "⌥⌘I",
      click: showAttachmentCb
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
      toolbar: [
        "both",
        "export",
        "outline",
        "info",
        "help"
      ],
    },]
}
