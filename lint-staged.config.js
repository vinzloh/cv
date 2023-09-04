// use JS config file - to run tsc without file argument
// https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
module.exports = {
  'src/**/*': ['prettier --write --cache --ignore-unknown'],
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --cache --fix'],
  // 'src/**/*.ts?(x)': () => 'turbo typecheck',
};
