import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. Извлекаем требуемые роли из декоратора (@Roles('ADMIN', 'USER'))
        // getAllAndOverride приоритезирует декоратор на методе над декоратором на классе
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Если декоратор не установлен, доступ разрешен (проверка ролей не требуется)
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        // 2. Адаптируем контекст под GraphQL
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const user = request.user as User;

        // 3. Проверяем наличие пользователя и его ролей
        // Мы предполагаем, что JwtStrategy уже сделал .populate('roles')
        if (!user || !user.roles || !Array.isArray(user.roles)) {
            throw new ForbiddenException('Доступ запрещен: роли пользователя не найдены');
        }

        // 4. Извлекаем только имена ролей для сравнения
        // В твоей схеме Role это поле 'name'
        const userRoleNames = user.roles.map((r: any) => r.name);

        // 5. Проверяем наличие хотя бы одной из требуемых ролей
        const hasRole = requiredRoles.some((role) => userRoleNames.includes(role));

        if (!hasRole) {
            throw new ForbiddenException(
                `Недостаточно прав. Требуемые роли: ${requiredRoles.join(', ')}`
            );
        }

        return true;
    }
}
