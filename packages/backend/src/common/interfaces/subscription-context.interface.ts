import { IncomingMessage } from 'http';
import { User } from '@/modules/user/entities/user.entity.js';
import { Context } from 'graphql-ws';

export interface SubscriptionContext extends Context {
    extra: {
        request: IncomingMessage;
        user?: User | null;
    };
}
