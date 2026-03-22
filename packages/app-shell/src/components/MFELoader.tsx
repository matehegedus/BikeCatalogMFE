/**
 * MFELoader
 *
 * Dynamically loads a remote microfrontend at runtime using the
 * @originjs/vite-plugin-federation runtime helpers:
 *   - __federation_method_setRemote    → registers remote URL at runtime
 *   - __federation_method_getRemote    → fetches the exposed module
 *   - __federation_method_unwrapDefault → normalises ESM default export
 *
 * The host (app-shell) has zero knowledge of remote URLs at build-time;
 * everything is driven by mfe-registry.json fetched from the asset server.
 */
import React, { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import type { MFERegistryEntry } from "../hooks/useMFERegistry";

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

/**
 * Module-level cache of lazy components keyed by remote name.
 *
 * lazy() must NOT be called inside a component body – even via useMemo –
 * because each call creates a new exotic component reference, resetting its
 * Suspense boundary and violating react-hooks/static-components.
 * A stable module-level reference is both correct and lint-clean.
 */
const lazyComponentCache = new Map<
  string,
  React.LazyExoticComponent<React.ComponentType>
>();

function getRemoteComponent(
  config: MFERegistryEntry,
): React.LazyExoticComponent<React.ComponentType> {
  const cached = lazyComponentCache.get(config.name);
  if (cached) return cached;

  const Component = lazy(async () => {
    __federation_method_setRemote(config.name, {
      url: () => Promise.resolve(config.remoteEntry),
      format: "esm",
      from: "vite",
    });

    const rawModule = await __federation_method_getRemote(
      config.name,
      config.exposedModule,
    );

    return { default: __federation_method_unwrapDefault(rawModule) };
  });

  lazyComponentCache.set(config.name, Component);
  return Component;
}

export default function MFELoader({ config }: MFELoaderProps) {
  const RemoteComponent = getRemoteComponent(config);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <RemoteComponent />
    </Suspense>
  );
}
