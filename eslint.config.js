import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/*.d.ts"],
  },

  // JS baseline
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // React (ESLint v9/v10-native plugin) + React Hooks
  {
    ...reactPlugin.configs.recommended,
    files: ["**/*.{ts,tsx}"],
    plugins: {
      ...reactPlugin.configs.recommended.plugins,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // False positive for module-level lazy component caches (e.g. MFELoader).
      // The rule can't introspect into functions that return stable cached refs.
      "react-hooks/static-components": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
    },
  },
);
