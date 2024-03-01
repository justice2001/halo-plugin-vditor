vditorRender.addExternal((conf) => {
    console.log("Run External Function: Media Render!")
    let root = document.getElementById("vditor-article-sign").parentElement;
    Vditor.mediaRender(root)
})