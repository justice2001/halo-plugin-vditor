vditorRender.addExternal((conf) => {
    console.log("Run External Function: Media Render!")
    let mediaRenderOption = document.getElementById("vditor-render").dataset.mediarender
    if (mediaRenderOption==="true") {
        let article = document.getElementById("vditor-render").parentElement;
        Vditor.mediaRender(article)
    }
})