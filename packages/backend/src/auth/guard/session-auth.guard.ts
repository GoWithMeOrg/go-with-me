import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Injectable()
export class SessionAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx =
            GqlExecutionContext.create(context).getContext?.() ??
            context.switchToHttp().getRequest();
        const req = ctx.req ?? context.switchToHttp().getRequest();
        if (!req?.user) {
            throw new GraphQLError('User is not authorized', {
                extensions: {
                    code: 'UNAUTHORIZED',
                    http: { status: 401 },
                },
            });
        }

        // Добавить логирование для отладки
        console.log('Session user:', req?.user);
        // return !!req?.user;
        return true;
    }
}
