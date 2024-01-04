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
  quickInsertList: QuickInsert[];
  enableQuickInsert: boolean;
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

export interface QuickInsert {
  // 展示名称
  name: string;
  // 鼠标移入时的提示文本
  tip: string;
  // 提供者
  provider: string;
  // 插入按钮的图标
  icon: string;
  // 配置结构
  schema: Schema[];
  inject?: Inject[];
}

export interface Inject {
  id: string;
  type: "script" | "style";
  url?: string;
}
