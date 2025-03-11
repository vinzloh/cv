/** @type {import('prettier').Config} */
module.exports = {
  importOrder: ['<THIRD_PARTY_MODULES>', '', '^@/(.*)$', '', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  overrides: [
    {
      files: ['*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
};
