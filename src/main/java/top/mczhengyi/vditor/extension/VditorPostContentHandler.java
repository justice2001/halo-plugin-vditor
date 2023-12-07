package top.mczhengyi.vditor.extension;

import com.google.common.base.Throwables;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.ReactivePostContentHandler;
import top.mczhengyi.vditor.bean.RenderConfig;
import top.mczhengyi.vditor.utils.ScriptUtils;

@Component
@AllArgsConstructor
@Slf4j
public class VditorPostContentHandler implements ReactivePostContentHandler {

    private final ReactiveSettingFetcher reactiveSettingFetcher;

    @Override
    public Mono<PostContentContext> handle(PostContentContext contentContext) {
        return reactiveSettingFetcher.fetch("render", RenderConfig.class)
                .map(renderConfig -> {
                    if (renderConfig.getEnableRender()) {
                        contentContext.setContent(ScriptUtils.renderScript(renderConfig) + "\n" + contentContext.getContent());
                    }
                    return contentContext;
                })
                .onErrorResume(e -> {
                    log.error("VditorHeadProcessor process failed", Throwables.getRootCause(e));
                    return Mono.just(contentContext);
                });
    }
}
