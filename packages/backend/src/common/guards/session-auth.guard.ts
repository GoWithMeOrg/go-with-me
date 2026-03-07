import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Injectable()
export class SessionAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const gqlContext = GqlExecutionContext.create(context);
        const { req } = gqlContext.getContext();

        if (!req?.user) {
            throw new GraphQLError('User is not authorized', {
                extensions: {
                    code: 'UNAUTHORIZED',
                    http: { status: 401 },
                },
            });
        }

        // console.log('Session user:', req?.user);
        return !!req?.user;
    }
}
