import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: ['./packages/backend/src/schema/schema.gql', './packages/backend/src/backend/**/*.gql'],

    documents: [
        'packages/frontend/src/app/graphql/queries/*.{ts,tsx}',
        'packages/frontend/src/app/graphql/mutations/*.{ts,tsx}',
        'packages/frontend/src/app/graphql/subscriptions/*.{ts,tsx}',

        '!packages/frontend/src/app/graphql/mutations/invations.ts',
        '!packages/frontend/src/app/graphql/queries/invations.ts',
    ],

    ignoreNoDocuments: true,

    generates: {
        'packages/frontend/src/app/graphql/types.ts': {
            plugins: ['typescript'],
            config: {
                avoidOptionals: false,
            },
        },
        'packages/frontend/src/app/graphql/operations.ts': {
            plugins: ['typescript-operations', 'typed-document-node'],
            config: {
                avoidOptionals: false,
                nonOptionalTypename: true,
            },
        },
    },
};

export default config;
