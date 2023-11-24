function render(selector, callback) {
    let mindmap = document.getElementsByClassName(selector)
    for (let i = 0; i < mindmap.length;i++) {
        const el = coverThis(mindmap[i])
        callback(el)
    }
}

function coverThis(el) {
    let copy = el.cloneNode(true)
    el.innerHTML = ""
    el.className = "vditor-reset"
    el.dataset.code = ""
    el.append(copy)
    return el
}

window.addEventListener("load", () => {
    render("language-math", Vditor.mathRender)
    render("language-mindmap", Vditor.mindmapRender)
    render("language-mermaid", Vditor.mermaidRender)
    render("language-echarts", Vditor.chartRender)
    render("language-abc", Vditor.abcRender)
    render("language-graphviz", Vditor.graphvizRender)
    render("language-flowchart", Vditor.flowchartRender)
})