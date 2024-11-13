import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended"
    ]
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];