vditorRender.addExternal((conf) => {
    document.querySelectorAll(".language-halo").forEach(el => {
        // TODO: Vditor未对getHTML的代码进行处理
        // 兼容老版本
        let oldVersion = false;
        const children = el.parentElement.children
        for (let i = 0; i < children.length.length; i++) {
            const child = children[i];
            if (child.getAttribute("id") === "vditor-article-sign") {
                oldVersion = true
                break
            }
        }
        if (oldVersion) {
            el.outerHTML = HaloJs.renderHalo(
                el.textContent,
                "/plugins/vditor-mde/assets/static/halo-renders"
            );
        } else {
            el.parentElement.outerHTML = HaloJs.renderHalo(
                el.textContent,
                "/plugins/vditor-mde/assets/static/halo-renders"
            );
        }
    })
})