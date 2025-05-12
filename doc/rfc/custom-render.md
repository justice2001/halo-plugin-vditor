# 自定义渲染器支持 [WIP]

Vditor 当前允许开发者配置自定义的渲染器，来实现自定义渲染的效果，
halo-plugin-vditor 允许通过 js 文件来进行自定义渲染器的设置。

## 数据结构

当前 vditor 将通过插件解析特定结构的 js 文件来实现自定义渲染器的加入。示例如 `custom-render-demo.js` 所示。

```js
(function () {
    return {
        language: 'custom',
        render: (content) => {
            return `<i>it works! ${content}</i>`
        }
    }
})
```

该文件返回了一个匿名函数，该函数返回了 vditor 需要的配置信息。包含下面两个参数：

- language: 该渲染器的id，全局只能存在一个相同的
- render: 渲染器函数，内容会通过第一个参数传递

render 函数返回的即为渲染内容。

## 使用方法

加载自定义渲染器后可以通过代码片段的方法来使用，调用的渲染器则通过语言标签来声明，如上面的渲染器的调用方法为：

```markdown
    ```custom
    zhengyi59
    ```
```

他渲染的结果则是：

```html
<i>it works! zhengyi59</i>
```

↓↓↓↓ 效果 ↓↓↓↓

<i>it works! zhengyi59</i>