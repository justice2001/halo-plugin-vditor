# Vditor-mde

> 🚧 项目正处于Beta测试阶段，可能会存在BUG，如果发现bug欢迎提ISSUE或者建议 🚧

本插件将Vditor整合进Halo，支持所见即所得编辑模式。

编辑器支持数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、graphviz 渲染、plantumlUML图

> Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。

## 💻使用方式

1. 下载，目前提供以下下载方式：
    - GitHub Releases：访问 [Releases](https://github.com/justice2001/vditor-plugin/releases) 下载 Assets 中的 JAR 文件。
    - Halo 应用市场：暂无
2. 安装，插件安装和更新方式可参考：<https://docs.halo.run/user-guide/plugins>。
3. 安装完成之后，进入文章新建页面即可在右上角编辑器切换按钮中看到 Vditor 编辑器。

## 📒TODO

- [x] 能够在Halo中运行Vditor编辑器
- [x] 支持数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、graphviz 渲染、plantumlUML图
- [ ] 支持暗色主题渲染
- [ ] 支持资源选取
- [ ] 支持代码高亮及复制
- [ ] 支持多媒体渲染

## 📃开发日志

- [Halo插件开发-Vditor Markdown（一）准备工作](https://halo.mczhengyi.top/archives/1700838373720)

## 🧑‍💻开发环境

插件开发的详细文档请查阅：<https://docs.halo.run/developer-guide/plugin/hello-world>

```bash
git clone git@github.com:halo-sigs/plugin-starter.git

# 或者当你 fork 之后

git clone git@github.com:{your_github_id}/plugin-starter.git
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

- [Hola官方文档](https://docs.halo.run)
- [willow-mde](https://github.com/guqing/willow-mde)
- [plugin-highlightjs](https://github.com/halo-sigs/plugin-highlightjs)