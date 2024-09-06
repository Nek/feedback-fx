let globals = require("globals");
let pluginJs = require("@eslint/js");
let tseslint = require("typescript-eslint");

module.exports = [
  {
    ignores: ["eslint.config.js"],
  },
  { files: ["html/**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
