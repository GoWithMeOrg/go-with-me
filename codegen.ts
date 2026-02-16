import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: ['./packages/backend/src/schema/schema.gql', './packages/backend/src/backend/**/*.gql'],

    // Рекурсивно ищем gql‑теги в TS/TSX
    documents: [
        'packages/frontend/src/app/graphql/queries/*.{ts,tsx}',

        '!packages/frontend/src/app/graphql/mutations/companionRequest.ts',
        '!packages/frontend/src/app/graphql/mutations/companions.ts',
        '!packages/frontend/src/app/graphql/mutations/invations.ts',
        '!packages/frontend/src/app/graphql/mutations/join.ts',
        '!packages/frontend/src/app/graphql/mutations/like.ts',

        '!packages/frontend/src/app/graphql/queries/applications.ts',
        '!packages/frontend/src/app/graphql/queries/companions.ts',
        '!packages/frontend/src/app/graphql/queries/events.ts',
        '!packages/frontend/src/app/graphql/queries/findUsers.ts',
        '!packages/frontend/src/app/graphql/queries/invations.ts',
        '!packages/frontend/src/app/graphql/queries/joined.ts',
        '!packages/frontend/src/app/graphql/queries/liked.ts',
    ],

    ignoreNoDocuments: true,

    generates: {
        // Общие типы для всей frontend‑части
        'packages/frontend/src/app/graphql/types.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
            config: {
                avoidOptionals: true,
                nonOptionalTypename: true,
            },
        },
    },
};

export default config;
