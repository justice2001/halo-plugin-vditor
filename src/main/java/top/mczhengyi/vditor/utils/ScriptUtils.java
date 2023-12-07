package top.mczhengyi.vditor.utils;

import top.mczhengyi.vditor.bean.RenderConfig;

public class ScriptUtils {
    public static String renderScript(RenderConfig renderConfig) {
        StringBuilder script = new StringBuilder();
        script.append(basicScript(renderConfig));
        // 如果是跟随Joe 3.0则注入脚本
        if ("joe".equals(renderConfig.getDarkMode()))
            script.append(joeDarkMode());
        return script.toString();
    }

    public static String basicScript(RenderConfig renderConfig) {
        return """
                <script src="/plugins/vditor-mde/assets/static/method.min.js"></script>
                <script src="/plugins/vditor-mde/assets/static/render.js" id="render-script"
                  data-dark="%s" data-mediaRender="%s"></script>
                """.formatted(renderConfig.getDarkMode(), renderConfig.getMediaRender());
    }

    public static String joeDarkMode() {
        return """
            <script>
            window.addEventListener("load", () => {
                var html = document.getElementsByTagName("html")[0]
                if (!html) return
                setTheme(html.dataset.mode)
                var callback = (mutation) => {
                    if (mutation[0].attributeName=="data-mode") {
                        console.log("CHANGED")
                        var mode = mutation[0].target.dataset.mode
                        setTheme(mode)
                    }
                }
                var observer = new MutationObserver(callback)
                observer.observe(html, {attributes:true})
            })
            </script>
            """;
    }
}
