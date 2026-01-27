import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  clean: true,
  experimentalDts: {
    compilerOptions: {
      moduleResolution: "node10",
      module: "ES2015",
    },
  },
});
