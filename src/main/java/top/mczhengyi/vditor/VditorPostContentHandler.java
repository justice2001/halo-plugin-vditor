package top.mczhengyi.vditor;

import com.google.common.base.Throwables;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.ReactivePostContentHandler;

@Component
@AllArgsConstructor
@Slf4j
public class VditorPostContentHandler implements ReactivePostContentHandler {

    private final ReactiveSettingFetcher reactiveSettingFetcher;

    @Override
    public Mono<PostContentContext> handle(PostContentContext contentContext) {
        return reactiveSettingFetcher.fetch("basic", BasicConfig.class)
                .map(basicConfig -> {
                    if (basicConfig.enable_render) {
                        contentContext.setContent(renderScript() + "\n" + contentContext.getContent());
                    }
                    return contentContext;
                })
                .onErrorResume(e -> {
                    log.error("VditorHeadProcessor process failed", Throwables.getRootCause(e));
                    return Mono.empty();
                });
    }

    private String renderScript() {
        return """
                <link rel="stylesheet" href="/plugins/vditor-mde/assets/static/index.css" />
                <script src="/plugins/vditor-mde/assets/static/method.min.js"></script>
                <script src="/plugins/vditor-mde/assets/static/render.js"></script>
                """;
    }

    @Data
    public static class BasicConfig {
        Boolean enable_render;
    }
}
