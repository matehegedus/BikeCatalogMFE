/**
 * Type declarations for the virtual module injected by
 * @originjs/vite-plugin-federation at build time.
 *
 * The plugin does not ship its own types for this virtual module, so this
 * file is the standard Vite approach (same pattern as vite/client).
 * Verified against @originjs/vite-plugin-federation@1.4.1 — if you upgrade
 * the plugin, cross-check these signatures against its dist/index.js.
 *
 * These three functions are the public API for dynamic (runtime) remote
 * loading – i.e. registering a remote whose URL is NOT known at build time.
 */
declare module "virtual:__federation__" {
  interface RemoteOptions {
    /** A function that resolves to the remote entry URL */
    url: () => Promise<string>;
    /** Module format – always 'esm' for Vite-based remotes */
    format: "esm" | "systemjs" | "var";
    /** Bundler that produced the remote: 'vite' | 'webpack' */
    from: "vite" | "webpack";
  }

  /**
   * Registers a remote at runtime so subsequent getRemote calls can
   * resolve it. Call this before getRemote for any dynamically-loaded MFE.
   */
  export function __federation_method_setRemote(
    remoteName: string,
    options: RemoteOptions,
  ): void;

  /**
   * Loads an exposed module from a previously-registered remote.
   * Returns the raw module object (may need unwrapDefault).
   */
  export function __federation_method_getRemote(
    remoteName: string,
    exposedModule: string,
  ): Promise<Record<string, unknown>>;

  /**
   * Normalises a federation module to its default export so it can be
   * used directly as a React component.
   */
  export function __federation_method_unwrapDefault(
    module: Record<string, unknown>,
  ): React.ComponentType;
}
