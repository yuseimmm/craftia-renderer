import * as path from "path";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@yuseimmm/craftia-renderer",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions:{
      plugins:[
        typescript({
          declaration: true,
          declarationMap: true,
          noEmitOnError: true,
          outDir: "dist/",
          rootDir: "src/",
        })
      ]
    },
    sourcemap: true,
  },
});