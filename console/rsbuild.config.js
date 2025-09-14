import { rsbuildConfig } from "@halo-dev/ui-plugin-bundler-kit";
import Icons from "unplugin-icons/rspack";

const OUT_DIR_PROD = "../src/main/resources/console";
const OUT_DIR_DEV = "../build/resources/main/console";

export default rsbuildConfig({
  rsbuild: ({ envMode }) => {
    const isProduction = envMode === "production";
    const outDir = isProduction ? OUT_DIR_PROD : OUT_DIR_DEV;

    return {
      resolve: {
        alias: {
          "@": "./src",
        },
      },
      output: {
        distPath: {
          root: outDir,
        },
      },
      tools: {
        rspack: {
          plugins: [Icons({ compiler: "vue3" })],
        },
      },
    };
  },
});
