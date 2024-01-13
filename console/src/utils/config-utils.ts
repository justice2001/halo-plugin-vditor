export declare type EditorConfig = {
  basic: {
    enable_render: boolean;
    defaultRenderMode: "ir" | "wysiwyg" | "sv" | undefined;
    typeWriterMode: boolean;
    codeBlockPreview: boolean;
    enableQuickInsert: boolean;
    quickInsertUrl: [];
    disableHTMLBlockPreview: boolean;
  };
  extension: {
    allowImageType: string;
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
    disableHTMLBlockPreview: false,
  },
  extension: {
    allowImageType: "png,jpg,jpeg,bmp,gif,webp,svg",
  }
}
