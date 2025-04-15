import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsdoc from "eslint-plugin-tsdoc";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {ignores: [
    "eslint.config.mjs",
    "dist/*",
    "docs/*"

  ]    
  },
  {
    plugins: {tsdoc}
    
  },
  {
    rules: {
      "prefer-const": "off",
      "tsdoc/syntax": "warn"
    }
  }
];