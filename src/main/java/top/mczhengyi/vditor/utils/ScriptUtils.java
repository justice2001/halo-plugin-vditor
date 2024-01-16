package top.mczhengyi.vditor.utils;

import org.pf4j.PluginWrapper;
import org.springframework.util.PropertyPlaceholderHelper;
import top.mczhengyi.vditor.bean.RenderConfig;
import java.util.Properties;

public class ScriptUtils {
    static final PropertyPlaceholderHelper
        PROPERTY_PLACEHOLDER_HELPER = new PropertyPlaceholderHelper("${", "}");

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
                <link rel="stylesheet" type="text/css" href="/plugins/vditor-mde/assets/static/vditor-render.css?version=${version}" id="vditor-style" />
                <script src="/plugins/vditor-mde/assets/static/dist/method.min.js?version=${version}"></script>
                <script src="/plugins/vditor-mde/assets/static/render.js?version=${version}" id="vditor-render"
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

    public static String setContentProperty(String script, PluginWrapper pluginWrapper) {
        final Properties properties = new Properties();
        properties.setProperty("version", pluginWrapper.getDescriptor().getVersion());
        return PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(script, properties);
    }
}
