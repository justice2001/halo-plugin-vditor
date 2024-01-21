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
        this.script.append("<script src=\"/plugins/vditor-mde/assets/static/%s?version=${version}\" id=\"vditor-%s\"></script>"
            .formatted(path, id));
        return this;
    }

    public ScriptBuilder innerScript(String script) {
        this.script.append("<script>%s</script>".formatted(script));
        return this;
    }

    public ScriptBuilder stylesheet(String path, String id) {
        this.script.append("<link rel=\"stylesheet\" type=\"text/css\" href=\"/plugins/vditor-mde/assets/static/%s?version=${version}\" id=\"vditor-%s\" />"
            .formatted(path, id));
        return  this;
    }

    public String getScript() {
        return this.script.toString();
    }
}
