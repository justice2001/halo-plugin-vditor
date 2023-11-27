import {definePlugin, type EditorProvider} from "@halo-dev/console-shared";
import Vditor from "./views/Vditor.vue";
import logo from "./assets/vditor.png"
import {markRaw} from "vue";

export default definePlugin({
  components: {},
  extensionPoints: {
    "editor:create": (): EditorProvider[] => {
      return [
        {
          name: "vditor-mde",
          displayName: "Vditor Markdown",
          component: markRaw(Vditor),
          rawType: "markdown",
          logo: logo
        },
      ];
    },
  },
});
