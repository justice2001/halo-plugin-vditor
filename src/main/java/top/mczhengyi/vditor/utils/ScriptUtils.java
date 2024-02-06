package top.mczhengyi.vditor.utils;

import org.pf4j.PluginWrapper;
import org.springframework.util.PropertyPlaceholderHelper;
import top.mczhengyi.vditor.bean.RenderConfig;
import java.util.Properties;

public class ScriptUtils {
    static final PropertyPlaceholderHelper
        PROPERTY_PLACEHOLDER_HELPER = new PropertyPlaceholderHelper("${", "}");

    public static String renderScript(RenderConfig renderConfig) {
        ScriptBuilder script = new ScriptBuilder();
        script.sign("article-sign")
            .variable("cdn", "/plugins/vditor-mde/assets/static/")
            .stylesheet("vditor-render.css", "style")
            .script("dist/method.min.js", "methods")
            .script("render-utils.js", "render-utils"); // 标记文章位置
        if (renderConfig.getMediaRender())
            script.script("external/media-render.js", "media");
        if (!renderConfig.getDarkMode().equals("disabled")) {
            script.script("dark-mode/dark-%s.js".formatted(renderConfig.getDarkMode()), "dark-mode");
        }
        script.script("halo-renders/index.js", "halo-render-js")
                .stylesheet("halo-renders/index.css", "halo-render-css")
                .script("external/halo-renders.js", "halo-render")
                .script("render.js", "render"); // 完成操作后渲染
        return script.getScript();
    }

    public static String setContentProperty(String script, PluginWrapper pluginWrapper) {
        final Properties properties = new Properties();
        properties.setProperty("version", pluginWrapper.getDescriptor().getVersion());
        return PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(script, properties);
    }
}
