export declare type EditorConfig = {
  basic: {
    enable_render: boolean;
    defaultRenderMode: "ir" | "wysiwyg" | "sv" | undefined;
    typeWriterMode: boolean;
    codeBlockPreview: boolean;
    enableQuickInsert: boolean;
    quickInsertUrl: [];
    customRenders: [];
    disableHTMLBlockPreview: boolean;
    firstH1AsTitle: boolean;
    macros: string;
    previewThemeBase: string;
    previewTheme: string;
  };
  extension: {
    allowImageType: string;
  };
  developer: {
    debugger: boolean;
  };
};

export const defaultEditorConfig: EditorConfig = {
  basic: {
    enable_render: true,
    defaultRenderMode: "ir",
    typeWriterMode: true,
    codeBlockPreview: true,
    enableQuickInsert: false,
    quickInsertUrl: [],
    customRenders: [],
    disableHTMLBlockPreview: false,
    firstH1AsTitle: false,
    macros: "",
    previewThemeBase: "",
    previewTheme: "",
  },
  extension: {
    allowImageType: "png,jpg,jpeg,bmp,gif,webp,svg",
  },
  developer: {
    debugger: false,
  },
};
