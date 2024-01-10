const THEME_PREFIX="/plugins/vditor-mde/assets/static/dist/css/content-theme"
const CDN = "/plugins/vditor-mde/assets/static"

window.addEventListener("load", () => {
    // 暗色模式初始化
    let dark = initDarkMode()
    setTheme(dark?"dark":"light")

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
    // Render Media
    let mediaRenderOption = document.getElementById("vditor-render").dataset.mediarender
    if (mediaRenderOption==="true") {
        let article = document.getElementById("vditor-render").parentElement;
        Vditor.mediaRender(article)
    }
})

/**
 * 初始化暗色模式策略
 * 创建所需监听器
 * @returns {boolean} 初始暗黑模式状态
 */
function initDarkMode() {
    let darkModeChange = document.getElementById("vditor-render").dataset.dark
    let dark = false
    // 检测暗黑模式策略
    switch (darkModeChange) {
            // 禁用暗黑模式
        case "disabled": break
            // 跟随系统
        case "system":
            dark = initSystemDarkMode()
    }
    return dark
}


/**
 * 系统模式暗黑模式策略
 * @returns {boolean}
 */
function initSystemDarkMode() {
    let media = window.matchMedia('(prefers-color-scheme: dark)');
    let callback = (e) => {
        let prefersDarkMode = e.matches;
        setTheme(prefersDarkMode?"dark":"light")
    };
    if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', callback);
    } else if (typeof media.addListener === 'function') {
        media.addListener(callback);
    }
    return media.matches
}

/**
 * 配置主题
 * @param theme 主题
 */
function setTheme(theme) {
    Vditor.setContentTheme(theme, THEME_PREFIX)
}