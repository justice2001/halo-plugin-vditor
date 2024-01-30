package top.mczhengyi.vditor.utils;

/**
 * Script Builder
 * 用于构造Script、内嵌Script、样式表
 * @author zhengyi59
 */
public class ScriptBuilder {
    private final StringBuilder script;

    ScriptBuilder() {
        this.script = new StringBuilder();
    }

    public ScriptBuilder script(String path, String id) {
        this.script.append("<script src=\"%s?version=${version}\" id=\"vditor-%s\"></script>"
            .formatted(getUrl(path), id));
        return this;
    }

    public ScriptBuilder innerScript(String script) {
        this.script.append("<script>%s</script>".formatted(script));
        return this;
    }

    public ScriptBuilder stylesheet(String path, String id) {
        this.script.append("<link rel=\"stylesheet\" type=\"text/css\" href=\"%s?version=${version}\" id=\"vditor-%s\" />"
            .formatted(getUrl(path), id));
        return  this;
    }

    public String getScript() {
        return this.script.toString();
    }

    private String getUrl(String url) {
        if (url.startsWith("http")) {
            return url;
        } else {
            return "/plugins/vditor-mde/assets/static/%s".formatted(url);
        }
    }
}
