const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');
const storybook = require('eslint-plugin-storybook');
const prettier = require('eslint-config-prettier/flat');

const frontendFiles = ['packages/frontend/**/*.{js,jsx,mjs,ts,tsx}'];
const backendFiles = ['packages/backend/**/*.ts'];

const nextConfigs = nextCoreWebVitals
    .filter((config) => !config.ignores)
    .map((config) => ({
        ...config,
        files: frontendFiles,
        settings: {
            ...config.settings,
            next: {
                ...config.settings?.next,
                rootDir: ['packages/frontend'],
            },
        },
    }));

module.exports = [
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/out/**',
            '**/.next/**',
            '**/coverage/**',
            '**/.turbo/**',
            '**/next-env.d.ts',
            'packages/frontend/src/app/graphql/types.ts',
            'packages/frontend/src/app/graphql/operations.ts',
            'packages/backend/src/schema/schema.gql',
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['**/*.{js,cjs,mjs}'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: { ...globals.node },
        },
    },

    ...nextConfigs,
    ...storybook.configs['flat/recommended'],

    {
        // App Router: каталога pages нет, правило про <a> для pages не применимо
        files: frontendFiles,
        rules: {
            '@next/next/no-html-link-for-pages': 'off',
        },
    },

    {
        files: backendFiles,
        languageOptions: {
            globals: { ...globals.node },
        },
    },

    prettier,
];
