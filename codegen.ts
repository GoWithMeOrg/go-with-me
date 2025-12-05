import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,

    // 1. КОНФИГУРАЦИЯ СХЕМЫ И ДОКУМЕНТОВ (ОСТАЕТСЯ КАК ЕСТЬ)
    schema: [
        './packages/backend/src/schema/schema.gql', // Большая схема
        './packages/backend/src/**/*.gql', // Маленькие модули (если Schema First)
    ],
    documents: [
        'packages/web-frontend/src/app/graphql/**/*.{ts,tsx}',
        // Все ваши исключения
        '!packages/web-frontend/src/app/graphql/mutations/companionRequest.ts',
        '!packages/web-frontend/src/app/graphql/mutations/companions.ts',
        '!packages/web-frontend/src/app/graphql/mutations/invations.ts',
        '!packages/web-frontend/src/app/graphql/mutations/join.ts',
        '!packages/web-frontend/src/app/graphql/mutations/like.ts',
        '!packages/web-frontend/src/app/graphql/mutations/updateUserProfile.ts',
        '!packages/web-frontend/src/app/graphql/mutations/user.ts',
    ],

    generates: {
        // 2. ЕДИНАЯ ТОЧКА ВЫВОДА ДЛЯ ВСЕХ ТИПОВ
        // Создаем один большой файл 'index.ts' в указанной вами директории.
        'packages/web-frontend/src/app/types/types.ts': {
            plugins: [
                // Плагин для генерации базовых типов схемы (интерфейсы User, Post, Enums, Inputs)
                'typescript',
                // Плагин для генерации типов запросов/мутаций (QueryType, MutationVariables)
                'typescript-operations',
                // 💡 Добавьте сюда плагин для вашего HTTP-клиента,
                // например, 'typescript-react-apollo' или 'typescript-react-query', если вы его используете.
            ],
            config: {
                // Убедитесь, что фрагменты не маскируются (по вашему запросу)
                fragmentMasking: false,
                // Добавьте, если нужно сгенерировать TS-док-ноды (нужно для некоторых клиентов)
                // exportFragmentDocument: true,
                // exportOperationDocument: true,
            },
        },
    },
};

export default config;
