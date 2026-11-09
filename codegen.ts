import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: ['./packages/backend/src/schema/schema.gql'],

    documents: [
        'packages/frontend/src/app/graphql/queries/*.{ts,tsx}',
        'packages/frontend/src/app/graphql/mutations/*.{ts,tsx}',
        'packages/frontend/src/app/graphql/subscriptions/*.{ts,tsx}',
    ],

    ignoreNoDocuments: true,

    generates: {
        'packages/shared/graphql.ts': {
            plugins: ['typescript'],
            config: {
                avoidOptionals: false,
                scalars: {
                    DateTime: 'string',
                },
            },
        },
        'packages/frontend/src/app/graphql/operations.ts': {
            // typed-document-node не подключён: запросы в проекте пишутся
            // руками через gql и типизируются TypedDocumentNode, а
            // сгенерированные DocumentNode-константы никто не импортирует.
            plugins: ['typescript-operations'],
            config: {
                avoidOptionals: false,
                nonOptionalTypename: true,
                scalars: {
                    DateTime: 'string',
                },
            },
        },
    },
};

export default config;
