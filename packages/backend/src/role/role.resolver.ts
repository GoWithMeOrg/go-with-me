import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { RoleService } from './role.service';

import { Role } from './entities/role.entity';

import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Resolver(() => Role)
export class RoleResolver {
    constructor(private readonly roleService: RoleService) {}

    @Query(() => [Role], {
        name: 'roles',
        description: 'Получить все роли',
    })
    async getAllRoles(): Promise<Role[]> {
        return this.roleService.getAllRoles();
    }

    @Query(() => Role, {
        name: 'roleByName',
        description: 'Поиск роли по названию',
    })
    async getRoleByName(@Args('name', { type: () => String }) name: string): Promise<Role> {
        const result = await this.roleService.getRoleByName(name);
        if (!result) {
            throw new Error(`Role with name '${name}' not found`);
        }
        return result;
    }

    @Query(() => Role, {
        name: 'roleById',
        description: 'Поиск роли по id',
    })
    getRoleById(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Role | null> {
        return this.roleService.getRoleById(id);
    }

    @Mutation(() => Role)
    createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput): Promise<Role> {
        return this.roleService.createRole(createRoleInput);
    }

    @Mutation(() => Role)
    updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput): Promise<Role | null> {
        return this.roleService.updateRole(updateRoleInput._id, updateRoleInput);
    }

    @Mutation(() => Role)
    async removeRole(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.roleService.removeRole(id);
        return !!result;
    }
}
