customElements.define(
        "joe-cloud",
        class JoeCloud extends HTMLElement {
            constructor() {
                super();
                this.options = {
                    type: this.getAttribute("type") || "default",
                    title: this.getAttribute("title") || "默认标题",
                    url: this.getAttribute("url"),
                    password: this.getAttribute("password"),
                };
                const type = {
                    default: "默认网盘",
                    360: "360网盘",
                    bd: "百度网盘",
                    ty: "天翼网盘",
                    ct: "城通网盘",
                    wy: "微云网盘",
                    github: "Github仓库",
                    gitee: "Gitee仓库",
                    lz: "蓝奏云网盘",
                    ad: "阿里云盘",
                };
                this.innerHTML = `
					<span class="joe_cloud">
						<div class="joe_cloud__logo _${this.options.type}"></div>
						<div class="joe_cloud__describe">
							<div class="joe_cloud__describe-title">${this.options.title}</div>
							<div class="joe_cloud__describe-type">来源：${
                        type[this.options.type] || "默认网盘"
                }${
                        this.options.password ? " | 提取码：" + this.options.password : ""
                }</div>
						</div>
						<a class="joe_cloud__btn" href="${
                        this.options.url
                }" target="_blank" rel="noopener noreferrer nofollow">
							<i class="fa fa-download"></i>
						</a>
					</span>
				`;
            }
        }
);