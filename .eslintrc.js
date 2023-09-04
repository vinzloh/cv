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
      files: ['src/**/*.{js,jsx,ts,tsx,astro}'],
      rules: {
        'react/display-name': ['error'], // don't break HMR with anonymous components
        'react-hooks/rules-of-hooks': ['error'],
        'react-hooks/exhaustive-deps': ['error'],
      },
    },
  ],
});
