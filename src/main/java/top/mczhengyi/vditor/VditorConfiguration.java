package top.mczhengyi.vditor;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import run.halo.app.plugin.ReactiveSettingFetcher;

@Component
@RequiredArgsConstructor
public class VditorConfiguration {
    private final ReactiveSettingFetcher settingFetcher;

    @Bean
    RouterFunction<ServerResponse> editorOptionsRouter() {
        return RouterFunctions.route()
            .GET("/apis/api.vditor.mczhengyi.top/editor-options",
                request -> settingFetcher.getValues()
                    .flatMap(result -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(result)
                    )
            )
            .GET("/apis/api.vditor.mczhengyi.top/macros",
                request -> settingFetcher.getValues()
                    .flatMap(result -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(result.get("basic").get("macros"))))
            .GET("/apis/api.vditor.mczhengyi.top/renders",
                request -> settingFetcher.getValues()
                    .flatMap(res -> ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(res.get("basic").get("customRenders"))))
            .build();
    }
}