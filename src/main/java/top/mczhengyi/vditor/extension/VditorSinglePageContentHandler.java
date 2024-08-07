package top.mczhengyi.vditor.extension;

import com.google.common.base.Throwables;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.PluginContext;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.ReactiveSinglePageContentHandler;
import top.mczhengyi.vditor.bean.RenderConfig;
import top.mczhengyi.vditor.utils.ScriptUtils;

@Component
@AllArgsConstructor
@Slf4j
public class VditorSinglePageContentHandler implements ReactiveSinglePageContentHandler {
    private final ReactiveSettingFetcher reactiveSettingFetcher;

    private final PluginContext pluginContext;

    @Override
    public Mono<SinglePageContentContext> handle(SinglePageContentContext contentContext) {
        return reactiveSettingFetcher.fetch("render", RenderConfig.class)
            .map(renderConfig -> {
                // 启用条件：开启渲染器，在启用仅Markdown渲染时当前页面为Markdown
                if (renderConfig.getEnableRender() &&
                    (!renderConfig.getOnlyMarkdown() || contentContext.getRawType().equals("markdown"))) {
                    var content = ScriptUtils.renderScript(renderConfig) + "\n" + contentContext.getContent();
                    contentContext.setContent(ScriptUtils.setContentProperty(content, pluginContext));
                }
                return contentContext;
            })
            .onErrorResume(e -> {
                if (e instanceof Throwable) {
                    log.error("VditorHeadProcessor process failed", Throwables.getRootCause(e));
                }
                return Mono.empty();
            });
    }
}
