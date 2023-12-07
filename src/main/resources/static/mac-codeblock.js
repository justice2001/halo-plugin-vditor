window.addEventListener("load", () => {
    initCode(false)
})

function initCode(isRefresh) {
    // const isPost = $(".page-post").length > 0;
    const $codeElms = $(".page-post pre, .page-journals pre, .page-sheet pre, #content pre");
    if (!$codeElms.length) return;

    $codeElms.each(function (_index, item) {
        const $item = $(item);
        const $codes = $item.find("code");
        if ($codes.length > 0) {
            if (isRefresh) {
                // 更新时重新绑定事件
                $item
                        .find(".code-expander")
                        .off("click")
                        .on("click", function (e) {
                            e.stopPropagation();
                            const $this = $(this);
                            const $auto_fold = $this
                                    .parent("pre")
                                    .siblings(".toolbar")
                                    .find(".autofold-tip");
                            $auto_fold && $auto_fold.remove();
                            $this.parent("pre").toggleClass("close");
                        });
                return;
            }
            // 添加默认代码类型为纯文本（已在prism源码中处理）
            const $curCode = $codes.eq(0);
            if (
            	!$curCode.attr("class") ||
              $curCode.attr("class").indexOf("language-") === -1
            ) {
            	$($curCode[0]).addClass("language-text");
            }
            $item.addClass("c_title")
            $item.addClass("c_hr")
            $item.addClass("c_macdot")
            $item.addClass("c_newline")
            $item.addClass("c_hover_tools")
            $item.addClass("line-numbers")
            // 代码复制
            // const text = $item.find("code[class*='language-']").text();
            // const span = $(
            //         "<span class=\"copy-button\"><i class=\"joe-font joe-icon-copy\" title=\"复制代码\"></i></span>"
            // );
            // new ClipboardJS(span[0], {
            //     // text: () => text + "\r\n\r\n" + ThemeConfig.copy_right_text,
            //     text: () => text,
            // }).on("success", () => Qmsg.success("复制成功！"));
            // $item.addClass("c_copy").append(span);
        }
    });
}