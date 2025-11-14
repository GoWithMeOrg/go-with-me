import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, {
    name: 'user',
    description: 'Поиск пользователя по id',
  })
  getUser(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId) {
    return this.userService.getUserById(id);
  }

  @Query(() => User, {
    name: 'userById',
    description: 'Поиск пользователя по id (устаревший синоним)',
  })
  getUserById(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId) {
    return this.userService.getUserById(id);
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
  removeUser(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId): Promise<boolean> {
    return this.userService.removeUser(id);
  }
}
