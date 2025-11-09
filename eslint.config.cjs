/* eslint config at workspace root */
module.exports = {
  root: true,
  ignorePatterns: ['node_modules', 'dist', 'build', '.next', 'coverage'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // this makes TypeScript project references work in subpackages
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // if you have Next.js apps, they’ll get extra rules via overrides below
    'prettier',
  ],
  rules: {
    // import sorting
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // optional: rely on the sorter instead of these
    'sort-imports': 'off',
  },

  // Per-framework overrides (optional but handy)
  overrides: [
    {
      files: ['**/packages/web-frontend/**/*.{js,jsx,ts,tsx}'],
      extends: ['next/core-web-vitals', 'prettier'],
    },
    // {
    //   files: ['**/packages/api-scheme/**/*.{js,jsx,ts,tsx}'],
    //   rules: {
    //     // backend-specific tweaks can go here
    //   },
    // },
    // {
    //   files: ['**/packages/backend/**/*.{js,jsx,ts,tsx}'],
    //   rules: {
    //     // backend-specific tweaks can go here
    //   },
    // },
  ],
};
