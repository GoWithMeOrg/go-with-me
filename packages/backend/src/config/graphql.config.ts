import { IncomingMessage } from 'http';
import { join } from 'path';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import * as cookie from 'cookie';
import * as signature from 'cookie-signature';
import { Context } from 'graphql-ws';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from 'src/modules/user/entities/user.entity';
import { isDev } from 'src/utils/is-dev.utils';
import { getMongoStore } from './mongo-store.config';

// Функция для получения конфигурации GraphQL модуля
// Возвращает объект с настройками для GraphQL
// В данном случае мы используем ApolloDriver для работы с Apollo Server
// Можно добавить другие настройки, такие как схемы, резолверы, контекст и т.д.

interface SubscriptionContext extends Context {
    extra: {
        request: IncomingMessage & {
            user?: User;
        };
    };
}

export async function getGraphQLConfig(
    configService: ConfigService,
    userModel: Model<UserDocument>
): Promise<ApolloDriverConfig> {
    return {
        driver: ApolloDriver,
        subscriptions: {
            'graphql-ws': {
                onConnect: async (context: Context) => {
                    const { extra } = context as SubscriptionContext;
                    const req = extra.request;

                    try {
                        const cookies = cookie.parse(req.headers.cookie || '');
                        const rawSid = cookies['connect.sid'];

                        if (!rawSid) return true;

                        const secret = configService.getOrThrow('SESSION_SECRET');
                        const sid = rawSid.startsWith('s:')
                            ? signature.unsign(rawSid.slice(2), secret)
                            : rawSid;

                        if (!sid) return true;

                        const store = getMongoStore(configService);
                        const session = await new Promise<any>((resolve, reject) => {
                            store.get(sid, (err, sess) => {
                                if (err) reject(err);
                                else resolve(sess);
                            });
                        });

                        if (session?.passport?.user) {
                            const userId = session.passport.user;

                            // Загружаем полные данные пользователя из БД
                            const user = await userModel.findById(userId).lean();

                            if (user) {
                                req.user = {
                                    _id: user._id,
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    image: user.image,
                                    description: user.description,
                                    roles: user.roles,
                                };
                                console.log('[WS onConnect] User:', user.email);
                            }
                        }

                        return true;
                    } catch (e) {
                        console.error('[WS Context Error]', e);
                        return true;
                    }
                },
                onDisconnect: async (context: Context) => {
                    const { extra } = context as SubscriptionContext;
                    const req = extra.request;
                    console.log('[WS onDisconnect] User:', req.user?.email || 'anonymous');
                },
            },
        },

        context: ({ req, extra }) => {
            if (extra) {
                // WebSocket (graphql-ws)
                const wsContext = {
                    req: extra.request,
                    user: extra.request.user,
                };
                console.log('[GraphQL WS context] user:', wsContext.user?.email || 'none');
                return wsContext;
            }
            return { req, user: req.user };
        },
        autoSchemaFile: isDev(configService) ? join(process.cwd(), 'src/schema/schema.gql') : true, // автоматически генерировать схему GraphQL
        sortSchema: true, // сортировать схему по алфавиту
        csrfPrevention: !isDev(configService),
        playground: false, // обязательно должен быть указан в false
        plugins: [
            isDev(configService)
                ? ApolloServerPluginLandingPageLocalDefault()
                : ApolloServerPluginLandingPageDisabled(),
        ],
    };
}
