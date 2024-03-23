package top.mczhengyi.vditor.bean;

import lombok.Data;

@Data
public class RenderConfig {
    private final String VDITOR_VERSION = "3.9.9";

    Boolean enableRender;
    String darkMode;
    Boolean mediaRender;
    Boolean onlyMarkdown;
    String cdn;
    String cdnUrl;

    public String getCdn() {
        if ("self-hosted".equals(cdn)) {
            return cdnUrl.replace("${v}", VDITOR_VERSION);
        }
        return cdn.replace("${v}", VDITOR_VERSION);
    }
}
