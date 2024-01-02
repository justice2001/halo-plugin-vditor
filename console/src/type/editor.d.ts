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
  openModal: (schema: Schema) => void;
};

export interface Schema {
  type: "template";
  id: string;
  icon?: string;
  name: string;
  formKit: Array;
  template?: string;
  // 解析后处理
  afterHandle?: (data: { [key: string]: string }, code: string) => string;
  // 覆盖解析
  handler?: (data: { [key: string]: string }) => string;
}
