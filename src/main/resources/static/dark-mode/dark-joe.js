window.addEventListener("load", () => {
    console.log("Use Joe Dark Mode")
    let html = document.getElementsByTagName("html")[0]
    if (!html) return
    const mode = html.dataset.mode
    setDarkMode(mode === "dark")
})