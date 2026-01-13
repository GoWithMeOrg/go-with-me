import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ModuleRef } from '@nestjs/core';
import { ENTITY_TYPE_KEY } from '../decorators/owner.decorator';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(private moduleRef: ModuleRef) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlContext = GqlExecutionContext.create(context);
        const { req } = gqlContext.getContext();
        const user = req.user;
        const args = gqlContext.getArgs();

        // Если пользователь не авторизован (SessionAuthGuard не сработал или не стоит выше)
        if (!user) {
            throw new ForbiddenException('Доступ запрещен: пользователь не определен');
        }

        // 1. Извлекаем ID ресурса из аргументов запроса
        const resourceId = args.id || args._id || args.input?.id;

        console.log(args.id);
        if (!resourceId) return true; // Если ID нет, это создание нового объекта

        // 2. Определяем имя сервиса через метаданные декоратора
        const entityName = Reflect.getMetadata(ENTITY_TYPE_KEY, context.getHandler());
        if (!entityName) return true; // Если декоратор не задан, пропускаем

        // 3. Получаем сервис и ищем сущность
        const service = this.moduleRef.get(`${entityName}Service`, { strict: false });
        const entity = await service.findById(resourceId);

        if (!entity) {
            throw new ForbiddenException('Ресурс не найден');
        }

        // 4. Упрощенная проверка: сравнение ownerId из БД с _id пользователя из сессии
        const isOwner = entity.ownerId?.toString() === user._id?.toString();

        if (!isOwner) {
            throw new ForbiddenException('Вы не являетесь владельцем этого ресурса');
        }

        return true;
    }
}
