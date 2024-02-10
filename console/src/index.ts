import { definePlugin, type EditorProvider } from "@halo-dev/console-shared";
import logo from "./assets/vditor.png";
import { markRaw } from "vue";
import VditorMde from "./views/VditorMde.vue";

export default definePlugin({
  components: {},
  extensionPoints: {
    "editor:create": (): EditorProvider[] => {
      return [
        {
          name: "vditor-mde",
          displayName: "Vditor Markdown",
          component: markRaw(VditorMde),
          rawType: "markdown",
          logo: logo,
        },
      ];
    },
  },
});
