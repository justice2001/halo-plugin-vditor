const THEME_PREFIX="/plugins/vditor-mde/assets/static/themes"
const CDN = "/plugins/vditor-mde/assets/static"

/** 拓展处理 ({dark}) => void */
let functionList = []
let darkMode = false

/**
 * 处理渲染
 * @param func
 */
function addExternal(func) {
    functionList.push(func)
}

/**
 * 设置暗色模式
 * @param {Boolean} dark
 */
function setDarkMode(dark = false) {
    darkMode = dark
}

/**
 * 渲染
 * @param dark
 */
function render(dark) {
    Vditor.setContentTheme(dark?"dark":"light", THEME_PREFIX)
    const root = document.getElementById("vditor-render").parentElement
    root.classList.add("vditor-reset")
    // Render
    const renderTheme = dark?"dark":"classic"
    Vditor.mathRender(root, {cdn: CDN})
    Vditor.mindmapRender(root, CDN, renderTheme)
    Vditor.mermaidRender(root, CDN, renderTheme)
    Vditor.chartRender(root, CDN, renderTheme)
    Vditor.abcRender(root, CDN)
    Vditor.graphvizRender(root, CDN)
    Vditor.flowchartRender(root, CDN)
    Vditor.haloRender(root, CDN)
    // Run External Plugin
    functionList.forEach(func => {
        func({
            dark
        })
    })
}

/**
 * 页面加载完成时处理任务
 */
function initRender() {
    window.addEventListener("load", () => render(darkMode))
}