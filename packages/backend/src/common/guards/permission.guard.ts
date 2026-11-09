import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import {
    PERMISSION_CHECK_KEY,
    RequiredPermission,
} from '@/common/decorators/check-permissions.decorator.js';
import { GqlContext } from '@/common/types/graphql-context.js';
import { Permission } from '@/modules/permission/entities/permission.entity.js';
import { Role } from '@/modules/role/entities/role.entity.js';

// Роли приходят в контекст из populate('roles') → populate('permissions') → populate('resource'),
// поэтому resource — это объект документа, а не ObjectId, как объявлено в сущности.
type PopulatedPermission = Omit<Permission, 'resource'> & { resource: { slug: string } };
type PopulatedRole = Omit<Role, 'permissions'> & { permissions: PopulatedPermission[] };

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
        const { user } = ctx.getContext<GqlContext>().req;

        if (!user || !user.roles) {
            throw new ForbiddenException(
                'Для выполнения операции необходима авторизация и наличие ролей'
            );
        }

        const roles = user.roles as unknown as PopulatedRole[];

        // Собираем все права пользователя в "плоский" список строк для быстрого сравнения
        const userPermissionKeys = roles.flatMap((role) =>
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
