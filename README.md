# halo-plugin-vditor

本插件将Vditor整合进Halo，支持所见即所得编辑模式。

编辑器支持数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、graphviz 渲染、plantumlUML图

> Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。

## ✨特性

- 集成强大的Markdown编辑器Vditor进Halo中
- 提供所见即所得(wysiwyg)、即时渲染(ir)、分屏渲染(sv)三种渲染模式
- 支持大纲、数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、多媒体、语音阅读、标题锚点、代码高亮及复制、graphviz 渲染、plantumlUML图
- 支持字符计数
- 支持在前台注入渲染脚本(需在设置中开启)
- 更多强大的语法功能请 [->到这<-](https://github.com/Vanessa219/vditor) 查看 (部分功能仍未支持)

## 💻使用方式

1. 下载，目前提供以下下载方式：
    - GitHub Releases：访问 [Releases](https://github.com/justice2001/vditor-plugin/releases) 下载 Assets 中的 JAR 文件。
    - Halo 应用市场：暂无
2. 安装，插件安装和更新方式可参考：<https://docs.halo.run/user-guide/plugins>。
3. 安装完成之后，进入文章新建页面即可在右上角编辑器切换按钮中看到 Vditor 编辑器。

## 📒TODO

> 如果可以支持的功能将会加入到这个TODO列表中，列表中没有的功能也未必是不能支持的，可能只是开发者没有想到

- [x] 能够在Halo中运行Vditor编辑器
- [x] 支持数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、graphviz 渲染、plantumlUML图
- [ ] 添加编辑器默认展示模式设置
- [ ] 优化代码命名
- [ ] 支持附件选取插入
- [ ] 支持代码高亮及复制
- [ ] 支持多媒体渲染
- [ ] 支持暗色主题渲染

## 🙏 鸣谢

>特别感谢[Vditor](https://github.com/Vanessa219/vditor),本插件大部分内容均为此编辑器提供

* [Vditor](https://github.com/Vanessa219/vditor) 一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。
* [Lute](https://github.com/88250/lute)：🎼 一款结构化的 Markdown 引擎，支持 Go 和 JavaScript
* [highlight.js](https://github.com/highlightjs/highlight.js)：JavaScript syntax highlighter
* [mermaid](https://github.com/knsv/mermaid)：Generation of diagram and flowchart from text in a similar manner as Markdown
* [incubator-echarts](https://github.com/apache/incubator-echarts)：A powerful, interactive charting and visualization library for browser
* [abcjs](https://github.com/paulrosen/abcjs)：JavaScript library for rendering standard music notation in a browser

## 🏗开发日志

- [Halo插件开发-Vditor Markdown（一）准备工作](https://blog.mczhengyi.top/archives/halo-plugin-dev-vditor-markdown-prepare)
- [Halo插件开发-Vditor Markdown（二）编辑器](https://blog.mczhengyi.top/archives/halo-plugin-dev-vditor-markdown-editor)
- Halo插件开发-Vditor Markdown（三）前台渲染注入 `努力赶稿中...`
- Halo插件开发-Vditor Markdown（四）使用Halo附件管理器插入图片 `努力开发中...`

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

## 📄参考文档

- [Halo官方文档](https://docs.halo.run)
- [willow-mde](https://github.com/guqing/willow-mde)
- [plugin-highlightjs](https://github.com/halo-sigs/plugin-highlightjs)