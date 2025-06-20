import { definePlugin, type EditorProvider } from "@halo-dev/console-shared";
import logo from "./assets/vditor.png";
import { defineAsyncComponent } from "vue";
import { VLoading } from "@halo-dev/components";

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
