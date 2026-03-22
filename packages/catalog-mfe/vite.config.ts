import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "catalogMFE",
      filename: "remoteEntry.js",
      exposes: {
        "./CatalogApp": "./src/CatalogApp",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
        "@mui/material": { singleton: true, requiredVersion: "^5.0.0" },
        "@emotion/react": { singleton: true, requiredVersion: "^11.0.0" },
        "@emotion/styled": { singleton: true, requiredVersion: "^11.0.0" },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    assetsDir: "assets",
  },
  server: {
    port: 3002,
  },
  preview: {
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
