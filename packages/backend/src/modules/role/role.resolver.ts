import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { Role } from './entities/role.entity';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Resolver(() => Role)
export class RoleResolver {
    constructor(private readonly roleService: RoleService) {}

    @Query(() => [Role], {
        name: 'roles',
        description: 'Получить все роли',
    })
    async getRoles(): Promise<Role[]> {
        return this.roleService.getRoles();
    }

    @Query(() => Role, {
        name: 'roleByName',
        description: 'Поиск роли по названию',
    })
    async getRoleByName(@Args('name', { type: () => String }) name: string): Promise<Role> {
        const result = await this.roleService.getRoleByName(name);
        if (!result) {
            throw new NotFoundException(`Role with name '${name}' not found`);
        }
        return result;
    }

    @Query(() => Role, {
        name: 'roleById',
        description: 'Поиск роли по id',
        nullable: true,
    })
    async getRoleById(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Role | null> {
        return this.roleService.getRoleById(id);
    }

    @Mutation(() => Role)
    async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput): Promise<Role> {
        return this.roleService.createRole(createRoleInput);
    }

    @Mutation(() => Role)
    async updateRole(
        @Args('updateRoleInput') updateRoleInput: UpdateRoleInput
    ): Promise<Role | null> {
        return this.roleService.updateRole(updateRoleInput._id, updateRoleInput);
    }

    @Mutation(() => Role)
    async addPermissionToRole(
        @Args('roleId', { type: () => ID }) roleId: MongoSchema.Types.ObjectId,
        @Args('permissionId', { type: () => [ID] }) permissionId: MongoSchema.Types.ObjectId[]
    ) {
        return this.roleService.addPermission(roleId, permissionId);
    }

    @Mutation(() => Role)
    async removePermissionFromRole(
        @Args('roleId', { type: () => ID }) roleId: MongoSchema.Types.ObjectId,
        @Args('permissionId', { type: () => ID }) permissionId: MongoSchema.Types.ObjectId
    ) {
        return this.roleService.removePermission(roleId, permissionId);
    }

    @Mutation(() => Boolean, {
        // возвращаем Boolean, а не Role
        name: 'removeRole',
        description: 'Удаление роли',
    })
    async removeRole(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.roleService.removeRole(id);
        return result.deletedCount > 0;
    }
}
