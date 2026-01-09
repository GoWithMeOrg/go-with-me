import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { ROLES_KEY } from '../decorators/roles.decorator';

import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<MongoSchema.Types.ObjectId[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const user = request.user as User;

        if (!user || !user.roles || !Array.isArray(user.roles)) {
            throw new ForbiddenException('У вас недостаточно прав');
        }

        // извлекаем название ролей
        const userRoleNames = user.roles.map((r: any) => r.role);
        // сравниваем, есть ли роли
        const hasRole = requiredRoles.some((role) => userRoleNames.includes(role));

        if (!hasRole) {
            throw new ForbiddenException('У вас не достаточно прав');
        }

        return true;
    }
}
