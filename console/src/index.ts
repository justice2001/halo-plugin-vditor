import { VLoading } from "@halo-dev/components";
import { definePlugin, type EditorProvider } from "@halo-dev/console-shared";
import { defineAsyncComponent } from "vue";

import logo from "./assets/vditor.png";

export default definePlugin({
  components: {},
  extensionPoints: {
    "editor:create": (): EditorProvider[] => {
      return [
        {
          name: "vditor-mde",
          displayName: "Vditor Markdown",
          component: defineAsyncComponent({
            loader: () => import("./views/VditorMde.vue"),
            loadingComponent: VLoading,
          }),
          rawType: "markdown",
          logo: logo,
        },
      ];
    },
  },
});
