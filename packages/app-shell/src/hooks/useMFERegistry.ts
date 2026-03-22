import { useState, useEffect } from "react";

export interface MFERegistryEntry {
  /** Unique name used as the federation remote identifier */
  name: string;
  /** Full URL to the remote's remoteEntry.js */
  remoteEntry: string;
  /** The exposed module path, e.g. "./CatalogApp" */
  exposedModule: string;
  /** React Router path, e.g. "/catalog" */
  route: string;
}

interface MFERegistryState {
  mfes: MFERegistryEntry[];
  loading: boolean;
  error: Error | null;
}

/**
 * Fetches and parses the MFE registry JSON from the asset server.
 * The URL defaults to http://localhost:4000/mfe-registry.json but can
 * be overridden via the VITE_REGISTRY_URL env variable.
 */
export function useMFERegistry(
  registryUrl: string = import.meta.env.VITE_REGISTRY_URL ??
    "http://localhost:4000/mfe-registry.json",
): MFERegistryState {
  const [state, setState] = useState<MFERegistryState>({
    mfes: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(registryUrl)
      .then((res) => {
        if (!res.ok)
          throw new Error(
            `Registry fetch failed: ${res.status} ${res.statusText}`,
          );
        return res.json();
      })
      .then((data: { mfes: MFERegistryEntry[] }) => {
        if (!cancelled) {
          setState({ mfes: data.mfes, loading: false, error: null });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState({ mfes: [], loading: false, error: err });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [registryUrl]);

  return state;
}
