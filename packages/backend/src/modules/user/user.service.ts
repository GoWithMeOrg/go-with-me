import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
    roleModel: any;
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {}

    getAllUsers(): Promise<User[] | null> {
        return this.userModel.find();
    }

    getUserById(id: MongoSchema.Types.ObjectId): Promise<User | null> {
        return this.userModel.findById(id);
    }

    getPublicProfile(id: MongoSchema.Types.ObjectId) {
        return this.userModel.findById(id).select('firstName lastName image description');
    }

    createUser(createUserInput: CreateUserInput) {
        const createUser = new this.userModel(createUserInput);
        return createUser.save();
    }

    updateUser(id: MongoSchema.Types.ObjectId, updateUserInput: UpdateUserInput) {
        return this.userModel.findByIdAndUpdate(id, updateUserInput, {
            new: true,
        });
    }

    updateUserRoles(id: MongoSchema.Types.ObjectId, roleIds: MongoSchema.Types.ObjectId[]) {
        return this.userModel.findByIdAndUpdate(
            id,
            { $push: { roles: { $each: roleIds } } },
            { new: true }
        );
    }

    // user.service.ts или auth.service.ts

    async addRoleByName(userId: string, roleName: string): Promise<User> {
        // 1. Ищем роль в базе данных по названию
        const role = await this.roleModel.findOne({ role: roleName }).exec();

        if (!role) {
            throw new NotFoundException(`Роль "${roleName}" не существует в системе`);
        }

        // 2. Добавляем ID роли в массив пользователя
        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                userId,
                { $addToSet: { roles: role._id } }, // Добавит только если такой роли еще нет
                { new: true }
            )
            .populate('roles') // Сразу подгружаем объекты ролей для GraphQL
            .exec();

        if (!updatedUser) {
            throw new NotFoundException('Пользователь не найден');
        }

        return updatedUser;
    }

    async removeRoleByName(userId: string, roleName: string): Promise<User> {
        // 1. Находим документ роли, чтобы получить её _id
        const role = await this.roleModel.findOne({ role: roleName }).exec();

        if (!role) {
            throw new NotFoundException(`Роль с названием "${roleName}" не найдена`);
        }

        // 2. Удаляем этот _id из массива roles пользователя
        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                userId,
                { $pull: { roles: role._id } }, // $pull удалит ID, даже если он там один
                { new: true }
            )
            .populate('roles') // Подгружаем оставшиеся роли для корректного ответа GraphQL
            .exec();

        if (!updatedUser) {
            throw new NotFoundException('Пользователь не найден');
        }

        return updatedUser;
    }

    removeUser(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return this.userModel.deleteOne({ _id: id }).exec();
    }
}
