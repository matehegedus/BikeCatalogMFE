import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cartMFE",
      filename: "remoteEntry.js",
      exposes: {
        // The app-shell will import this via the registry exposedModule field
        "./CartApp": "./src/CartApp",
        // Headless service — eagerly loaded by app-shell on boot so cart
        // state is always tracked regardless of which route is active.
        "./CartService": "./src/CartService",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
        "@mui/material": { singleton: true, requiredVersion: "^5.0.0" },
        "@emotion/react": { singleton: true, requiredVersion: "^11.0.0" },
        "@emotion/styled": { singleton: true, requiredVersion: "^11.0.0" },
        "@bike-catalog/event-bus": { singleton: true },
      },
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    // Assets end up at dist/assets/remoteEntry.js – matching the registry URL
    assetsDir: "assets",
  },
  server: {
    port: 3003,
  },
  preview: {
    port: 3003,
    // Allow the app-shell (cross-origin) to load the remote entry
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
