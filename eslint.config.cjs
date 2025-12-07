const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const nextCoreWebVitals = nextPlugin.configs['core-web-vitals'];

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**', '**/coverage/**'],
  },
  ...compat.config({
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  }),
  {
    files: ['**/packages/web-frontend/**/*.{js,jsx,ts,tsx}'],
    ...nextCoreWebVitals,
    settings: {
      ...(nextCoreWebVitals.settings ?? {}),
      next: {
        ...(nextCoreWebVitals.settings?.next ?? {}),
        rootDir: ['packages/web-frontend'],
      },
    },
    rules: {
      ...nextCoreWebVitals.rules,
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
