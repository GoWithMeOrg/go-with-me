import { Roles } from '@/common/decorators/roles.decorator.js';
import { RolesGuard } from '@/common/guards/roles.guard.js';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard.js';
import { CreateRoleInput } from '@/modules/role/dto/create-role.input.js';
import { UpdateRoleInput } from '@/modules/role/dto/update-role.input.js';
import { Role } from '@/modules/role/entities/role.entity.js';
import { RoleService } from '@/modules/role/role.service.js';
import { User } from '@/modules/user/entities/user.entity.js';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

@Resolver(() => Role)
@UseGuards(SessionAuthGuard, RolesGuard)
@Roles('admin')
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
    async getRoleById(@Args('id', { type: () => ID }) id: Types.ObjectId): Promise<Role | null> {
        return this.roleService.getRoleById(id);
    }

    @Query(() => User, {
        name: 'roleByUserId',
        description: 'Поиск роли по id пользователя',
        nullable: true,
    })
    async getRoleByUserId(
        @Args('userId', { type: () => ID }) userId: Types.ObjectId
    ): Promise<User | null> {
        return this.roleService.getRoleByUserId(userId);
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
        @Args('roleId', { type: () => ID }) roleId: Types.ObjectId,
        @Args('permissionId', { type: () => [ID] }) permissionId: Types.ObjectId[]
    ) {
        return this.roleService.addPermission(roleId, permissionId);
    }

    @Mutation(() => Role)
    async removePermissionFromRole(
        @Args('roleId', { type: () => ID }) roleId: Types.ObjectId,
        @Args('permissionId', { type: () => ID }) permissionId: Types.ObjectId
    ) {
        return this.roleService.removePermission(roleId, permissionId);
    }

    @Mutation(() => Boolean, {
        // возвращаем Boolean, а не Role
        name: 'removeRole',
        description: 'Удаление роли',
    })
    async removeRole(@Args('id', { type: () => ID }) id: Types.ObjectId): Promise<boolean> {
        const result = await this.roleService.removeRole(id);
        return result.deletedCount > 0;
    }
}
