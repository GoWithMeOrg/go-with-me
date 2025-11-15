import { AuthenticationError } from '@nestjs/apollo/dist/errors';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx =
      GqlExecutionContext.create(context).getContext?.() ?? context.switchToHttp().getRequest();
    const req = ctx.req ?? context.switchToHttp().getRequest();
    if (!req?.user) {
      // Явно бросаем ошибку GraphQL/Apollo
      throw new AuthenticationError('User is not authorized');
    }

    // Добавить логирование для отладки
    console.log('Session user:', req?.user);
    return !!req?.user;
  }
}
