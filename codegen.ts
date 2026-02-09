import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    // Подхватываем схему из файлов бэкенда
    schema: ['./packages/backend/src/schema/schema.gql', './packages/backend/src/**/*.gql'],
    // теперь он ищет запросы в папке фронтенда
    documents: ['packages/frontend/src/**/*.{ts,tsx}'],

    generates: {
        'packages/frontend/src/app/types/types.ts': {
            plugins: [
                'typescript', // Базовые типы (Scalars, Enums)
                'typescript-operations', // Типы Query и Mutation
                'typescript-react-apollo', // Генерирует готовые хуки (useSearchQuery и т.д.)
            ],
            config: {
                // Важные настройки для удобства:
                withHooks: true, // Сгенерирует готовые хуки типа useSearchLazyQuery
                withComponent: false, // Не генерировать старые классовые компоненты
                withHOC: false, // Не генерировать HOC
                typesPrefix: 'I', // (Опционально) Добавит 'I' к интерфейсам: IUser
                maybeValue: 'T | null', // Как обрабатывать nullable поля
            },
        },
    },
};

export default config;
