package run.halo.starter;

import com.google.common.base.Throwables;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.RouteMatcher;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.dialect.TemplateHeadProcessor;

@Component
@AllArgsConstructor
@Slf4j
public class VditorHeadProcessor implements TemplateHeadProcessor {

    private static final String TEMPLATE_ID_VARIABLE = "_templateId";

    private final ReactiveSettingFetcher reactiveSettingFetcher;

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
        IElementModelStructureHandler structureHandler) {
        return reactiveSettingFetcher.fetch("basic", BasicConfig.class)
            .doOnNext(basicConfig -> {
                log.info(String.valueOf(basicConfig.enable_render));
                if (!basicConfig.enable_render || notContentTemplate(context)) {
                    return;
                }

                final IModelFactory modelFactory = context.getModelFactory();
                String scriptString = renderScript();
                model.add(modelFactory.createText(scriptString));
            })
            .onErrorResume(e -> {
                log.error("VditorHeadProcessor process failed", Throwables.getRootCause(e));
                return Mono.empty();
            })
            .then();
    }


    private String renderScript() {
        return """
                <link rel="stylesheet" href="https://unpkg.com/vditor/dist/index.css" />
                <script src="https://unpkg.com/vditor/dist/method.min.js"></script>
                <script src="/plugins/vditor-mde/assets/static/render.js"></script>
                """;
    }

    public boolean notContentTemplate(ITemplateContext context) {
        return !"post".equals(context.getVariable(TEMPLATE_ID_VARIABLE))
            && !"page".equals(context.getVariable(TEMPLATE_ID_VARIABLE));
    }

    @Data
    public static class BasicConfig {
        Boolean enable_render;
    }
}
