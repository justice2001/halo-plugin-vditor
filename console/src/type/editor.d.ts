export declare type EditorConfig = {
  basic: {
    enable_render: boolean;
    defaultRenderMode: "ir" | "wysiwyg" | "sv" | undefined;
    typeWriterMode: boolean;
    codeBlockPreview: boolean;
  };
};

export declare type Options = {
  defaultRenderMode: "ir" | "wysiwyg" | "sv" | undefined;
  typeWriterMode: boolean;
  after: () => void;
  input: () => void;
  showAttachment: () => void;
  language: string;
  codeBlockPreview: boolean;
  uploadImage?: (files: File[]) => string | null | Promise;
  openModal: (name: string) => void;
};
