import {definePlugin, type EditorProvider} from "@halo-dev/console-shared";
import HomeView from "./views/HomeView.vue";
import logo from "./assets/vditor.png"
import { markRaw } from "vue";

export default definePlugin({
  components: {},
  extensionPoints: {
    "editor:create": (): EditorProvider[] => {
      return [
        {
          name: "Vditor",
          displayName: "Vditor Markdown",
          // @ts-ignore
          component: HomeView,
          rawType: "markdown",
          logo: logo
        },
      ];
    },
  },
});
