import { join } from 'path';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';

import { isDev } from 'src/utils/is-dev.utils';

// Функция для получения конфигурации GraphQL модуля
// Возвращает объект с настройками для GraphQL
// В данном случае мы используем ApolloDriver для работы с Apollo Server
// Можно добавить другие настройки, такие как схемы, резолверы, контекст и т.д.

export async function getGraphQLConfig(configService: ConfigService): Promise<ApolloDriverConfig> {
    return {
        driver: ApolloDriver,
        autoSchemaFile: isDev(configService) ? join(process.cwd(), 'src/schema/schema.gql') : true, // автоматически генерировать схему GraphQL
        sortSchema: true, // сортировать схему по алфавиту
        csrfPrevention: !isDev(configService),
        plugins: [
            isDev(configService)
                ? ApolloServerPluginLandingPageLocalDefault()
                : ApolloServerPluginLandingPageDisabled(),
        ],
        context: ({ req, res }) => ({ req, res }), // передавать объекты запроса и ответа в контекст GraphQL
    };
}
