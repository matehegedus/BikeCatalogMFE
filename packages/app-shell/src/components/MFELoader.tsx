/**
 * MFELoader
 *
 * Dynamically loads a remote microfrontend at runtime using the
 * @originjs/vite-plugin-federation runtime helpers:
 *   - __federation_method_setRemote   → registers remote URL at runtime
 *   - __federation_method_getRemote   → fetches the exposed module
 *   - __federation_method_unwrapDefault → normalises ESM default export
 *
 * This means the host (app-shell) has ZERO knowledge of remote URLs at
 * build-time; everything is driven by mfe-registry.json.
 */
import { lazy, Suspense, useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import type { MFERegistryEntry } from "../hooks/useMFERegistry";

// The plugin emits the 'virtual:__federation__' module only when the host has
// remotes configured. It provides runtime helpers for overriding remote URLs.
// The declaration lives in src/types/federation.d.ts
import {
  __federation_method_setRemote,
  __federation_method_getRemote,
  __federation_method_unwrapDefault,
} from "virtual:__federation__";

interface MFELoaderProps {
  config: MFERegistryEntry;
}

function LoadingFallback() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default function MFELoader({ config }: MFELoaderProps) {
  // useMemo so the lazy component is only created once per config.name
  const RemoteComponent = useMemo(
    () =>
      lazy(async () => {
        // 1. Tell the federation runtime where to find this remote
        __federation_method_setRemote(config.name, {
          url: () => Promise.resolve(config.remoteEntry),
          format: "esm",
          from: "vite",
        });

        // 2. Fetch the exposed module from the remote
        const rawModule = await __federation_method_getRemote(
          config.name,
          config.exposedModule,
        );

        // 3. Normalise to a React-compatible default export
        const Component = __federation_method_unwrapDefault(rawModule);
        return { default: Component };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.name],
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      <RemoteComponent />
    </Suspense>
  );
}
