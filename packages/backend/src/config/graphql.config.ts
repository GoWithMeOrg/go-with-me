import { join } from 'path';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import * as cookie from 'cookie';
import * as signature from 'cookie-signature';
import { Context } from 'graphql-ws';
import { Model } from 'mongoose';

import { SubscriptionContext } from 'src/common/interfaces/subscription-context.interface';
import { UserDocument } from 'src/modules/user/entities/user.entity';
import { isDev } from 'src/utils/is-dev.utils';
import { getMongoStore } from './mongo-store.config';

export async function getGraphQLConfig(
    configService: ConfigService,
    userModel: Model<UserDocument>
): Promise<ApolloDriverConfig> {
    return {
        driver: ApolloDriver,
        autoSchemaFile: isDev(configService) ? join(process.cwd(), 'src/schema/schema.gql') : true, // автоматически генерировать схему GraphQL
        sortSchema: true, // сортировать схему по алфавиту
        csrfPrevention: !isDev(configService),
        playground: false, // обязательно должен быть указан в false
        plugins: [
            isDev(configService)
                ? ApolloServerPluginLandingPageLocalDefault()
                : ApolloServerPluginLandingPageDisabled(),
        ],
        subscriptions: {
            'graphql-ws': {
                onConnect: async (context: Context) => {
                    const { extra } = context as SubscriptionContext;

                    try {
                        const req = extra.request;
                        const cookieHeader = req?.headers?.cookie || '';
                        const cookies = cookie.parse(cookieHeader);
                        const rawSid = cookies['connect.sid'];

                        if (!rawSid) return;

                        const secret = configService.getOrThrow('SESSION_SECRET');
                        const sid = rawSid.startsWith('s:')
                            ? signature.unsign(decodeURIComponent(rawSid.slice(2)), secret)
                            : rawSid;

                        if (!sid) return;

                        const store = getMongoStore(configService);

                        const session = await new Promise<any>((resolve, reject) => {
                            store.get(sid, (err, sess) => (err ? reject(err) : resolve(sess)));
                        });

                        if (!session?.passport?.user) return;

                        const user = await userModel.findById(session.passport.user).lean();

                        extra.user = user;

                        console.log('[WS CONNECT]', user?.email);
                    } catch (e) {
                        console.error('[WS CONNECT ERROR]', e);
                        extra.user = null;
                    }
                },

                onDisconnect: (context: SubscriptionContext) => {
                    const { extra } = context;
                    console.log('[WS DISCONNECT]', extra?.user?.email);
                },
            },
        },

        context: ({ req, extra }) => {
            if (req) {
                // console.log('[HTTP REQUEST] req.headers.cookie:', req.headers?.cookie);
                // console.log('[HTTP REQUEST] req.user:', req.user);
                return {
                    req,
                    user: req.user,
                };
            }

            if (extra) {
                // console.log('[WS EXTRA]', extra);
                // sconsole.log('[WS EXTRA.user]', extra.user);
                return {
                    req: extra.request,
                    user: extra.user,
                };
            }
        },
    };
}
