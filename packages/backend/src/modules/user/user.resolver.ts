import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Schema as MongoSchema } from 'mongoose';

import { UserService } from './user.service';
import { LocationService } from 'src/modules/location/location.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { User } from './entities/user.entity';

import { SessionAuthGuard } from 'src/common/guards/session-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

import { Roles } from '../../common/decorators/roles.decorator';

import { UserRole } from 'src/common/enums/roles.enum';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly locationService: LocationService
    ) {}

    @Query(() => User, {
        name: 'user',
        description: 'Поиск пользователя по id',
    })
    async getUserById(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId) {
        return await this.userService.getUserById(id);
    }

    @Query(() => [User], {
        name: 'users',
        description: 'Получить всех пользователей',
    })
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Mutation(() => User, {
        name: 'createUser',
        description: 'Создать пользователя',
    })
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }

    @Mutation(() => User, {
        name: 'updateUser',
        description: 'Обновить данные пользователя',
    })
    updateUser(
        @Args('updateUserId', { type: () => ID }) id: MongoSchema.Types.ObjectId,
        @Args('user', { type: () => UpdateUserInput }) updateUserInput: UpdateUserInput
    ) {
        return this.userService.updateUser(id, updateUserInput);
    }

    @Mutation(() => Boolean, {
        name: 'removeUser',
        description: 'Удалить пользователя',
    })
    async removeUser(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.userService.removeUser(id);
        return result.deletedCount > 0;
    }

    @Mutation(() => User, {
        name: 'addUserRole',
        description: 'добавать роль пользователю',
    })
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN) // Только администратор может назначать роли
    async addUserRole(
        @Args('userId') userId: string,
        @Args('roleName') roleName: string
    ): Promise<User> {
        return this.userService.addRoleByName(userId, roleName);
    }

    @Mutation(() => User, {
        name: 'removeUserRole',
        description: 'добавать роль пользователю',
    })
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async removeRoleByName(
        @Args('userId') userId: string,
        @Args('roleName') roleName: string
    ): Promise<User> {
        return this.userService.removeRoleByName(userId, roleName);
    }
}
