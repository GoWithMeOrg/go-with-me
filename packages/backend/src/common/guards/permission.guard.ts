// src/common/guards/permission.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
    PERMISSION_CHECK_KEY,
    RequiredPermission,
} from '../decorators/check-permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.get<RequiredPermission[]>(
            PERMISSION_CHECK_KEY,
            context.getHandler()
        );

        // Если метод не помечен декоратором, пропускаем (публичный или только AuthGuard)
        if (!requiredPermissions) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const { user } = ctx.getContext().req;

        if (!user || !user.roles) {
            throw new ForbiddenException(
                'Для выполнения операции необходима авторизация и наличие ролей'
            );
        }

        // Собираем все права пользователя в "плоский" список строк для быстрого сравнения
        const userPermissionKeys = user.roles.flatMap((role) =>
            role.permissions.map((p) => `${p.action}:${p.resource.slug.toUpperCase()}`)
        );

        // Проверяем, что у пользователя есть ВСЕ права, указанные в декораторе
        const hasAllRequired = requiredPermissions.every(([action, resource]) => {
            const requiredKey = `${action}:${resource.toUpperCase()}`;
            return userPermissionKeys.includes(requiredKey);
        });

        if (!hasAllRequired) {
            throw new ForbiddenException('Доступ запрещен: у вас недостаточно прав');
        }

        return true;
    }
}
