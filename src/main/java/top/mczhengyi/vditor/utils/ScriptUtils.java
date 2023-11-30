package top.mczhengyi.vditor.utils;

import top.mczhengyi.vditor.bean.BasicConfig;

public class ScriptUtils {
    public static String renderScript(BasicConfig basicConfig) {
        return """
                <script src="/plugins/vditor-mde/assets/static/method.min.js"></script>
                <script src="/plugins/vditor-mde/assets/static/render.js" id="render-script"
                  data-dark="%s" data-mediaRender="%s"></script>
                """.formatted(basicConfig.getDarkMode(), basicConfig.getMediaRender());
    }
}
