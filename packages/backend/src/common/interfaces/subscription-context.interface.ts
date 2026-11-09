import { IncomingMessage } from 'http';
import { Context } from 'graphql-ws';

import { User } from '@/modules/user/entities/user.entity.js';

export interface SubscriptionContext extends Context {
    extra: {
        request: IncomingMessage;
        user?: User | null;
    };
}
