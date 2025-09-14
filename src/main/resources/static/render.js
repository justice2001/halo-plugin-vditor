if (!window.vditorPjax) {
    window.vditorPjax = true
    let cdnVar = document.getElementById("vditor-var-cdn")
    let cdn = cdnVar ? cdnVar.getAttribute("value") : ""
    cdn && vditorRender.setCDN(cdn)
    // 当网页已经准备就绪则直接执行渲染任务
    if (document.readyState === "complete") {
        vditorRender.render()
    } else {
        window.addEventListener('load', () => vditorRender.render())
    }
    // 兼容 JQuery-PJAX
    if (typeof $ !== 'undefined' && $ && typeof $.fn !== 'undefined') {
        $(document).on('pjax:complete', function() {
            vditorRender.render()
            console.log("[Vditor Render] JQuery-PJAX END")
        })
        $(document).on('pjax:end', function() {
            vditorRender.render()
            console.log("[Vditor Render] JQuery-PJAX END")
        })
    }
    console.log("[Vditor Render] PJAX Injected")
}
