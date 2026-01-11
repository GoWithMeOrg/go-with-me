import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';

import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Resolver(() => Permission)
export class PermissionResolver {
    constructor(private readonly permissionService: PermissionService) {}

    @Query(() => [Permission], {
        name: 'permission',
        description: 'Получить все права',
    })
    async getAllPermissions(): Promise<Permission[]> {
        return this.permissionService.getAllPermissions();
    }

    @Query(() => Permission, {
        name: 'permissionByName',
        description: 'Поиск роли по названию',
    })
    async getPermissionByName(
        @Args('name', { type: () => String }) name: string
    ): Promise<Permission> {
        const result = await this.permissionService.getPermissionByName(name);
        if (!result) {
            throw new Error(`Role with name '${name}' not found`);
        }
        return result;
    }

    @Query(() => Permission, {
        name: 'permissionById',
        description: 'Поиск роли по id',
    })
    getPermissionById(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Permission | null> {
        return this.permissionService.getPermissionById(id);
    }

    @Mutation(() => Permission)
    createPermission(
        @Args('createPermissionInput') createPermissionInput: CreatePermissionInput
    ): Promise<Permission> {
        return this.permissionService.createPermission(createPermissionInput);
    }

    @Mutation(() => Permission)
    updatePermission(
        @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput
    ): Promise<Permission | null> {
        return this.permissionService.updatePermission(
            updatePermissionInput._id,
            updatePermissionInput
        );
    }

    @Mutation(() => Permission)
    async removePermission(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.permissionService.removePermission(id);
        return !!result;
    }
}
