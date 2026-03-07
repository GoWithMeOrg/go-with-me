import { IncomingMessage } from 'http';
import { Context } from 'graphql-ws';

import { User } from 'src/modules/user/entities/user.entity';

export interface SubscriptionContext extends Context {
    extra: {
        request: IncomingMessage;
        user?: User | null;
    };
}
