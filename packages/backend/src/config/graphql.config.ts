import { join } from 'path';
import { SubscriptionContext } from '@/common/interfaces/subscription-context.interface.js';
import { ReqWithPassport } from '@/common/types/graphql-context.js';
import { getMongoStore } from '@/config/mongo-store.config.js';
import { UserDocument } from '@/modules/user/entities/user.entity.js';
import { isDev } from '@/utils/is-dev.utils.js';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import * as cookie from 'cookie';
import * as signature from 'cookie-signature';
import { Context } from 'graphql-ws';
import { Model } from 'mongoose';

type AuthSession = import('express-session').SessionData & {
    passport?: { user?: unknown };
};

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
                        const cookies = cookie.parseCookie(cookieHeader);
                        const rawSid = cookies['connect.sid'];

                        if (!rawSid) return;

                        const secret = configService.getOrThrow('SESSION_SECRET');
                        const sid = rawSid.startsWith('s:')
                            ? signature.unsign(decodeURIComponent(rawSid.slice(2)), secret)
                            : rawSid;

                        if (!sid) return;

                        const store = getMongoStore(configService);

                        const session = await new Promise<AuthSession | null>((resolve, reject) => {
                            store.get(sid, (err, sess) =>
                                err ? reject(err) : resolve(sess ?? null)
                            );
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

                onDisconnect: (context: Context) => {
                    const { extra } = context as SubscriptionContext;
                    console.log('[WS DISCONNECT]', extra?.user?.email);
                },
            },
        },

        context: ({
            req,
            extra,
        }: {
            req?: ReqWithPassport;
            extra?: SubscriptionContext['extra'];
        }) => {
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
