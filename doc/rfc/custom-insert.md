# 快速插入 设计方案

> Issue https://github.com/justice2001/halo-plugin-vditor/issues/11
 
## 目标

- 应该为用户提供一个可以存储自定义插入按钮配置的设置项
- 应当允许用户关闭自定义插入按钮的功能
- 为开发者维护一个form表单来管理插入资源

## 设计

使用json格式来存储自定义插入按钮的配置，并使用FormKit来生成表单，用户填写提交表单后自动将表单数据替换至预设的文本内容中。

### 配置格式

```json
{
"type": "template",
"id": "joe-progress",
"icon": "",
"name": "Joe Progress Bar",
"formkit": [
  {
    "$formkit": "text",
    "name": "percentage",
    "label": "Percentage",
    "help": "This is the percentage for progress bar."
  },
  {
    "$formkit": "text",
    "name": "color",
    "label": "Color",
    "help": "This is the color for progress bar."
  }
],
"template": "<joe-progress percentage=\"$percentage$\" color=\"$color$\"></joe-progress>"
}
```

### 配置文件示例

[quick-insert-demo.json](quick-insert-demo.json)

### 表单方案

与Halo相同的使用FormKit Schema方案，便于Halo开发者使用，但不应支持特别复杂的语法，应当支持一些较为基础的语法为优。

Halo使用的是yml格式语法，而为了方便配置文件编辑，插件暂时指定json为配置格式。

### 存储方案

对配置存储方案有下列四种：

- 使用依赖于Halo原生的附件管理（未验证是否可行）
- 提供配置输入框，让用户粘贴配置文件
- 🌟 提供URL输入框，让用户自行根据主题或插件配置文档输入URL
- 🌟 自动识别某个特定目录是否存储配置文件（适用主题端）

## 多语言适配

WIP(v1.5.x暂时不做规划)