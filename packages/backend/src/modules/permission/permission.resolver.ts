import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from 'src/common/guards/session-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => Permission)
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles('admin')
export class PermissionResolver {
    constructor(private readonly permissionService: PermissionService) {}

    @Query(() => [Permission], {
        name: 'permissions',
        description: 'Получить все права',
    })
    async getAllPermissions(): Promise<Permission[]> {
        return this.permissionService.getAllPermissions();
    }

    @Query(() => Permission, {
        name: 'permissionByName',
        description: 'Поиск права по названию',
    })
    async getPermissionByName(
        @Args('name', { type: () => String }) name: string
    ): Promise<Permission> {
        const result = await this.permissionService.getPermissionByName(name);
        if (!result) {
            // Используем встроенные исключения NestJS для GraphQL
            throw new NotFoundException(`Permission with name '${name}' not found`);
        }
        return result;
    }

    @Query(() => Permission, {
        name: 'permissionById',
        description: 'Поиск права по id',
        nullable: true,
    })
    async getPermissionById(
        // Используем String в Args для совместимости с ID типом GraphQL
        @Args('id', { type: () => ID }) id: string
    ): Promise<Permission | null> {
        return this.permissionService.getPermissionById(new MongoSchema.Types.ObjectId(id) as any);
    }

    @Mutation(() => [Permission], {
        name: 'createResourcePermissions',
        description:
            'Creates missing CRUD permissions for a specific resource based on Action enum',
    })
    async createResourcePermissions(
        @Args('resourceId', { type: () => ID }) resourceId: MongoSchema.Types.ObjectId
    ) {
        // Вызываем сервис, который мы написали на предыдущем шаге
        return this.permissionService.createResourcePermissions(resourceId);
    }

    @Mutation(() => Permission, {
        name: 'togglePermissionStatus',
        description: 'Переключает статус активности права (включает/выключает)',
    })
    async togglePermissionStatus(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId) {
        return this.permissionService.togglePermissionStatus(id);
    }
}
