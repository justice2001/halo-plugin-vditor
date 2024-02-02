package top.mczhengyi.vditor;

import org.pf4j.PluginWrapper;

public class Constants {
    public static final String VDITOR_VERSION = "3.9.9";
    public static final String CDN_UPKG = "https://unpkg.com/vditor@${VDITOR_VERSION}";
    public static final String CDN_JSDELIVR = "https://cdn.jsdelivr.net/npm/vditor@${VDITOR_VERSION}";
    public static final String INTERNAL = "/plugins/vditor-mde/assets/static";

    public static String getCdn(String type) {
        switch (type) {
            case "upkg":
                return CDN_UPKG.replace("${VDITOR_VERSION}", VDITOR_VERSION);
            case "jsdelivr":
                return CDN_JSDELIVR.replace("${VDITOR_VERSION}", VDITOR_VERSION);
            default:
                return INTERNAL;
        }
    }
}
