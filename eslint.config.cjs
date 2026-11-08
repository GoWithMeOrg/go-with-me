const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');
const storybook = require('eslint-plugin-storybook');
const prettier = require('eslint-config-prettier/flat');
const { fixupPluginRules } = require('@eslint/compat');

const frontendFiles = ['packages/frontend/**/*.{js,jsx,mjs,ts,tsx}'];
const backendFiles = ['packages/backend/**/*.ts'];

// eslint-plugin-react, eslint-plugin-import и eslint-plugin-jsx-a11y
// ещё не перешли на API ESLint 10 (context.getFilename и т.п.),
// поэтому оборачиваем их через слой совместимости. Плагины
// typescript-eslint и @next/next обновлены и в патче не нуждаются —
// их нельзя подменять, иначе ESLint увидит два разных инстанса.
const legacyPlugins = new Set(['react', 'import', 'jsx-a11y']);

const fixupPlugins = (config) => {
    if (!config.plugins) return config;

    return {
        ...config,
        plugins: Object.fromEntries(
            Object.entries(config.plugins).map(([name, plugin]) => [
                name,
                legacyPlugins.has(name) ? fixupPluginRules(plugin) : plugin,
            ])
        ),
    };
};

const nextConfigs = nextCoreWebVitals
    .map(fixupPlugins)
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
            '**/dist-old*/**',
            '**/build/**',
            '**/out/**',
            '**/.next/**',
            '**/coverage/**',
            '**/.turbo/**',
            '**/.agents/**',
            '**/next-env.d.ts',
            'packages/shared/graphql.ts',
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
        rules: {
            // CommonJS-конфиги (eslint.config.cjs и т.п.) по определению на require
            '@typescript-eslint/no-require-imports': 'off',
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
