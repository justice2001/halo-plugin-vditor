package top.mczhengyi.vditor.extension;

import com.google.common.base.Throwables;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.ReactivePostContentHandler;
import top.mczhengyi.vditor.bean.BasicConfig;
import top.mczhengyi.vditor.utils.ScriptUtils;

@Component
@AllArgsConstructor
@Slf4j
public class VditorPostContentHandler implements ReactivePostContentHandler {

    private final ReactiveSettingFetcher reactiveSettingFetcher;

    @Override
    public Mono<PostContentContext> handle(PostContentContext contentContext) {
        return reactiveSettingFetcher.fetch("render", BasicConfig.class)
                .map(basicConfig -> {
                    if (basicConfig.getEnable_render()) {
                        contentContext.setContent(ScriptUtils.renderScript(basicConfig) + "\n" + contentContext.getContent());
                    }
                    return contentContext;
                })
                .onErrorResume(e -> {
                    log.error("VditorHeadProcessor process failed", Throwables.getRootCause(e));
                    return Mono.just(contentContext);
                });
    }
}
