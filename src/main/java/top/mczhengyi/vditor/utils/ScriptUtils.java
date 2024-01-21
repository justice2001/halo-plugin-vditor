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
        script.stylesheet("vditor-render.css", "style")
            .script("dist/method.min.js", "methods")
            .script("render.js", "render");
        if (renderConfig.getMediaRender())
            script.script("external/media-render.js", "media");
        if (!renderConfig.getDarkMode().equals("disabled")) {
            script.script("dark-mode/dark-%s.js".formatted(renderConfig.getDarkMode()), "dark-mode");
        }
        script.innerScript("initRender()");
        return script.getScript();
    }

    public static String setContentProperty(String script, PluginWrapper pluginWrapper) {
        final Properties properties = new Properties();
        properties.setProperty("version", pluginWrapper.getDescriptor().getVersion());
        return PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(script, properties);
    }
}
