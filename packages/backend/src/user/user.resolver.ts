import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Location } from '../location/entities/location.entity';
import { Schema as MongoSchema } from 'mongoose';
import { LocationService } from 'src/location/location.service';

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
    } // дополнительный запрос при это поле в User нет поля локация
    // @ResolveField(() => Location, { nullable: true })
    // async location(@Parent() user: User) {
    //     // Мы ищем локацию, которая принадлежит этому юзеру
    //     return await this.locationService.getLocationByOwner(user._id);
    // }

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
}
