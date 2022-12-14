import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: !process.env.PROD,
  },
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@Assets": path.resolve(__dirname, "src/assets"),
      "@Views": path.resolve(__dirname, "src/views"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Models": path.resolve(__dirname, "src/models"),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});
