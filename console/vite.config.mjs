import path from "node:path";
import { viteConfig } from "@halo-dev/ui-plugin-bundler-kit/vite";

export default viteConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
    },
  },
});
