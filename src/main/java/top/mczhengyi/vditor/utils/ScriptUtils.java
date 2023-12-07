package top.mczhengyi.vditor.utils;

import top.mczhengyi.vditor.bean.RenderConfig;

public class ScriptUtils {
    public static String renderScript(RenderConfig renderConfig) {
        return """
                <script src="/plugins/vditor-mde/assets/static/method.min.js"></script>
                <script src="/plugins/vditor-mde/assets/static/render.js" id="render-script"
                  data-dark="%s" data-mediaRender="%s"></script>
                """.formatted(renderConfig.getDarkMode(), renderConfig.getMediaRender());
    }
}
