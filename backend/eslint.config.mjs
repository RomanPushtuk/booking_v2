import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import ESLintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{ts,tsx}"] },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "node_modules",
      "dist",
      ".prettierrc.js",
      "jest.config.js",
      "webpack.config.js",
      "src/migrations",
      "src/monitoring",
      "src/shared/logger/monitoring.js",
    ],
  },
  ESLintConfigPrettier,
];
