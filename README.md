# halo-plugin-vditor

<a href="https://www.halo.run/store/apps/app-uBcYw"><img src="https://img.shields.io/badge/Halo-应用市场-%230A81F5?logo=appstore&logoColor=%23fff"></a>
![](https://img.shields.io/badge/状态-稳定-red.svg)
![](https://img.shields.io/badge/启动时间-2023/11/23-green.svg)
![](https://img.shields.io/badge/优先级-HIGH-blue.svg)
![GitHub Release](https://img.shields.io/github/v/release/justice2001/halo-plugin-vditor?color=yellow&label=版本)

本插件将Vditor整合进Halo，支持所见即所得编辑模式。 Support English (*Only Editor)!

编辑器支持数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、graphviz 渲染、plantumlUML图

如果您在使用本插件的过程中发现了BUG或新的建议，欢迎您在 [Github ISSUE](https://github.com/justice2001/halo-plugin-vditor/issues/new) 中提出

> Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。

## ✨特性

- 集成强大的Markdown编辑器Vditor进Halo中
- 提供所见即所得(wysiwyg)、即时渲染(ir)、分屏渲染(sv)三种渲染模式
- 支持大纲、数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、多媒体、语音阅读、标题锚点、代码高亮及复制、graphviz 渲染、plantumlUML图
- 支持字符计数
- 支持在前台注入渲染脚本(需在设置中开启)
- 更多强大的语法功能请 [->到这<-](https://github.com/Vanessa219/vditor) 查看 (部分功能仍未支持)
- 支持独有的自定义语法，详细语法请参考 [这里](https://github.com/justice2001/vditor-halo-render#语法参考)

## 💻使用方式

1. 下载，目前提供以下下载方式：
    - GitHub Releases：访问 [Releases](https://github.com/justice2001/vditor-plugin/releases) 下载 Assets 中的 JAR 文件。
    - Halo 应用市场：[https://www.halo.run/store/apps/app-uBcYw](https://www.halo.run/store/apps/app-uBcYw)
2. 安装，插件安装和更新方式可参考：<https://docs.halo.run/user-guide/plugins>。
3. 安装完成之后，进入文章新建页面即可在右上角编辑器切换按钮中看到 Vditor 编辑器。

## 📚 部分配置说明

### 自定义渲染器

> ⚠️ 安全声明：请不要加载来源不明的渲染器，自定义渲染器有代码执行的功能，随意加载可能会导致安全事件的发生。

在自定义渲染器中填入要加载的 js 链接，在编辑时会自动载入这个 js。

### 自定义预览主题

此配置用于编辑器在预览时的主题，由两个选项构成：自定义主题基础地址、自定义主题名称。

- 自定义主题基础地址：该字段为基础地址，不填写使用 vditor 内置主题，你也可以填写你的主题库地址，或填写 /upload/ 直接从 halo 附件库选择。
- 自定义主题名称：该字段为主题名称，即 css 文件的文件名，vditor 内置的主题有：ant-design、dark、light、wechat

这两个字段会共同定位一个 css 样式地址，组合规则为：`{自定义主题基础地址}/{自定义主题名称}.css`。注意，其他编辑器的主题无法直接在 vditor 中使用，需要进行一些改造，一般来讲只需要将文章选择器修改为`.vditor-reset`即可，如typora 的主题就可以将 `#write` 修改为 `.vditor-reset`

## 🤖兼容性

下面是当前已知的兼容性问题

- 在同时使用ToolBench插件时，数学公式、脑图、图表、流程图、甘特图、时序图、五线谱无法正常渲染。`由于此插件修改了页面结构，所以不会修复`
- Vditor渲染器不会根据主题暗色模式进行改变，当前仅支持跟随系统暗色模式

## 📒TODO

> 如果可以支持的功能将会加入到这个TODO列表中，列表中没有的功能也未必是不能支持的，可能只是开发者没有想到

> 插件的进度在 [Gitea](https://git.mczhengyi.top/zhengyi/halo-plugin-vditor/issues) 进行管理，当前Gitea不支持您评论，如果您想讨论Issue可以直接在Github上打开一个Issue并表明要讨论的Gitea Issue，您的回复将会被同步到Gitea。

- [x] 能够在Halo中运行Vditor编辑器
- [x] 支持数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、graphviz 渲染、plantumlUML图
- [x] 添加编辑器默认展示模式设置
- [x] 优化代码命名
- [x] 添加打字机模式
- [x] 支持附件选取插入
- [x] 支持暗色主题渲染
- [x] 支持多媒体渲染
- [x] 拆分配置为编辑器配置与渲染配置两部分
- [x] 添加多国语言支持 `手搓翻译函数实现`
- [x] 跟随主题的暗色模式(joe主题)
- [x] 将Vditor前台渲染资源全量引入本地
- [ ] 支持代码高亮及复制
- [ ] 自定义暗色模式触发方式
- [ ] 支持AI编写与修改
- [ ] ~~内置渲染器与ToolBench不兼容~~

## 🙏 鸣谢

> 特别感谢来自 [Halo](https://github.com/halo-dev) 的投喂

> 特别感谢[Vditor](https://github.com/Vanessa219/vditor),本插件大部分内容均为此编辑器提供

* [Vditor](https://github.com/Vanessa219/vditor) 一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。
* [Lute](https://github.com/88250/lute)：🎼 一款结构化的 Markdown 引擎，支持 Go 和 JavaScript
* [highlight.js](https://github.com/highlightjs/highlight.js)：JavaScript syntax highlighter
* [mermaid](https://github.com/knsv/mermaid)：Generation of diagram and flowchart from text in a similar manner as Markdown
* [incubator-echarts](https://github.com/apache/incubator-echarts)：A powerful, interactive charting and visualization library for browser
* [abcjs](https://github.com/paulrosen/abcjs)：JavaScript library for rendering standard music notation in a browser
* [juice](https://github.com/Automattic/juice): Given HTML, juice will inline your CSS properties into the style attribute. 用于复制到微信公众号功能

## 🏗开发日志

- [Halo插件开发-Vditor Markdown（一）准备工作](https://blog.mczhengyi.top/archives/halo-plugin-dev-vditor-markdown-prepare)
- [Halo插件开发-Vditor Markdown（二）编辑器](https://blog.mczhengyi.top/archives/halo-plugin-dev-vditor-markdown-editor)
- [Halo插件开发-Vditor Markdown（三）插件设置](https://blog.mczhengyi.top/archives/halo-plugin-dev-vditor-3-settings)
- Halo插件开发-Vditor Markdown（四）前台渲染注入 `努力赶稿中...`
- Halo插件开发-Vditor Markdown（五）使用Halo附件管理器插入图片 `努力开发中...`

## 🧑‍💻开发环境

插件开发的详细文档请查阅：<https://docs.halo.run/developer-guide/plugin/hello-world>

```bash
git clone git@github.com:justice2001/vditor-mde.git

# 或者当你 fork 之后

git clone git@github.com:{your_github_id}/vditor-mde.git
```

```bash
cd path/to/plugin-starter
```

```bash
# 下载依赖包

# macOS/Linux执行:
chmod a+x download_dist.sh
./download_dist.sh

# Windows
# 要求安装7Zip并将7Zip的文件夹加入Path环境变量
./download_dist.bat
```



```bash
# macOS / Linux
./gradlew pnpmInstall

# Windows
./gradlew.bat pnpmInstall
```

```bash
# macOS / Linux
./gradlew build

# Windows
./gradlew.bat build
```

修改 Halo 配置文件：

```yaml
halo:
  plugin:
    runtime-mode: development
    fixedPluginPath:
      - "/path/to/plugin-starter"
```

## 🧑‍💼发布

您可以在 [Gitea ISSUE](https://git.mczhengyi.top/zhengyi/halo-plugin-vditor/issues) 看到该项目的进展

项目发布在 [Github](https://github.com/justice2001/halo-plugin-vditor) 和 [Gitee](https://gitee.com/zhengyi59/halo-plugin-vditor)

## 📄参考文档

- [Halo官方文档](https://docs.halo.run)
- [willow-mde](https://github.com/guqing/willow-mde)
- [plugin-highlightjs](https://github.com/halo-sigs/plugin-highlightjs)