import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: ['./packages/backend/src/schema/schema.gql', './packages/backend/src/backend/**/*.gql'],

    documents: [
        // Включаем queries, mutations, subscriptions
        'packages/frontend/src/app/graphql/queries/*.{ts,tsx}',
        'packages/frontend/src/app/graphql/mutations/*.{ts,tsx}',
        'packages/frontend/src/app/graphql/subscriptions/*.{ts,tsx}',

        // Исключаем конкретные файлы мутаций
        // '!packages/frontend/src/app/graphql/mutations/companionRequest.ts',
        // '!packages/frontend/src/app/graphql/mutations/companions.ts',
        '!packages/frontend/src/app/graphql/mutations/invations.ts',
        '!packages/frontend/src/app/graphql/mutations/join.ts',
        '!packages/frontend/src/app/graphql/mutations/like.ts',

        // Исключаем конкретные файлы queries
        // '!packages/frontend/src/app/graphql/queries/applications.ts',
        // '!packages/frontend/src/app/graphql/queries/companions.ts',
        // '!packages/frontend/src/app/graphql/queries/events.ts',
        // '!packages/frontend/src/app/graphql/queries/findUsers.ts',
        '!packages/frontend/src/app/graphql/queries/invations.ts',
        '!packages/frontend/src/app/graphql/queries/joined.ts',
        '!packages/frontend/src/app/graphql/queries/liked.ts',
    ],

    ignoreNoDocuments: true,

    generates: {
        'packages/frontend/src/app/graphql/types.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
            config: {
                avoidOptionals: false,
                nonOptionalTypename: true,
            },
        },
    },
};

export default config;
