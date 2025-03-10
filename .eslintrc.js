/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  env: {
    browser: true,
    node: true, // process.env.NODE_ENV
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:astro/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'import', // https://github.com/import-js/eslint-plugin-import
    'react', // https://github.com/jsx-eslint/eslint-plugin-react#list-of-supported-rules
    'react-hooks', // https://www.npmjs.com/package/eslint-plugin-react-hooks
  ],
  settings: { react: { version: 'detect' } },
  overrides: [
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': ['warn'],
        '@typescript-eslint/triple-slash-reference': ['off'],
        'react/display-name': ['error'], // don't break HMR with anonymous components
        'react-hooks/rules-of-hooks': ['error'],
        'react-hooks/exhaustive-deps': ['error'],
      },
    },
    // https://ota-meshi.github.io/eslint-plugin-astro/user-guide/
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
});
