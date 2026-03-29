// Lighthouse CI configuration
// Docs: https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
//
// Usage:
//   pnpm lighthouse          – build, start all servers, audit, assert, then stop.
//   pnpm lighthouse:collect  – collect only (app must already be running on :3000).
//
// The collect step runs `pnpm preview` which:
//   1. builds every package
//   2. starts the registry server  (:4000)
//   3. starts all MFE preview servers  (:3001-3003)
//   4. starts the app-shell preview    (:3000)

/** @type {import('@lhci/cli').LighthouseRcConfig} */
module.exports = {
  ci: {
    collect: {
      // Command that starts the whole stack (builds first, then serves).
      startServerCommand: "pnpm preview",
      // lhci waits until this string appears in the server's stdout/stderr.
      startServerReadyPattern: "localhost:3000",
      // Allow up to 2 minutes for the full build + boot.
      startServerReadyTimeout: 120000,
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/catalog",
        "http://localhost:3000/cart",
      ],
      // One run is enough for a quick CI gate; raise to 3 for stable medians.
      numberOfRuns: 1,
      settings: {
        // 'desktop' preset sets formFactor + screenEmulation together,
        // avoiding the mobile/desktop mismatch error.
        // Switch to 'perf' for the default mobile audit.
        preset: "desktop",
      },
    },

    assert: {
      // Fail the CI step if any of these thresholds are not met.
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
      },
    },

    upload: {
      // Uploads reports to a free, temporary public URL (no account needed).
      // Switch to 'lhci' target to self-host on your own LHCI server.
      target: "temporary-public-storage",
    },
  },
};
