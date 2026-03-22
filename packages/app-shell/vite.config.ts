import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// The plugin ships with 'singleton' commented out in its SharedConfig type
// (a bug in @originjs/vite-plugin-federation@1.4.1) — restore it here.
declare module "@originjs/vite-plugin-federation" {
  interface SharedConfig {
    singleton?: boolean;
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app-shell",
      // Remotes must be listed here so the plugin emits the __federation_fn_import
      // virtual module with the dynamic helper functions. The default URLs below
      // are overridden at runtime via __federation_method_setRemote, driven by
      // the mfe-registry.json served from the asset server (:4000).
      remotes: {
        homeMFE: "http://localhost:3001/assets/remoteEntry.js",
        catalogMFE: "http://localhost:3002/assets/remoteEntry.js",
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
    // Required for module federation to work correctly
    target: "esnext",
    minify: false,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
