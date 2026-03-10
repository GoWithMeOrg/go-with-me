import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { User, UserDocument } from './entities/user.entity';
import { Role, RoleDocument } from '../role/entities/role.entity';
import { Companion, CompanionDocument } from '../companion/entities/companion.entity';
import { CompanionRequest } from '../companion-request/entities/companion-request.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,

        @InjectModel(Companion.name)
        private companionModel: Model<CompanionDocument>,

        @InjectModel(CompanionRequest.name)
        private companionRequestModel: Model<CompanionRequest>,

        @InjectModel(Role.name)
        private roleModel: Model<RoleDocument>
    ) {}

    getAllUsers(): Promise<User[] | null> {
        return this.userModel.find();
    }

    getUserById(id: MongoSchema.Types.ObjectId): Promise<User | null> {
        return this.userModel
            .findById(id)
            .populate({ path: 'roles', populate: { path: 'permissions' } })
            .exec();
    }

    getPublicProfile(id: MongoSchema.Types.ObjectId) {
        return this.userModel.findById(id).select('firstName lastName image description');
    }

    async findByEmailOrName(
        query?: string,
        user_id?: MongoSchema.Types.ObjectId
    ): Promise<User[] | null> {
        // Фильтруем результат по имени или email
        const filters: any = {};

        if (query) {
            filters.$or = [
                { email: { $regex: query, $options: 'i' } },
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $concat: ['$firstName', ' ', '$lastName'] },
                            regex: query,
                            options: 'i',
                        },
                    },
                },
            ];
        }

        let users = await this.userModel.find(filters);

        // Если передан user_id, исключаем компаньонов и заявки
        if (user_id) {
            // Получаем массив ID компаньонов пользователя
            const companions = await this.companionModel.findOne({ ownerId: user_id }).exec();
            const companionIds = companions?.companions ? companions.companions.map(String) : [];

            // Ищем заявки в друзья
            const activeRequests = await this.companionRequestModel
                .find({
                    $or: [
                        { sender: user_id, status: 'PENDING' },
                        { receiver: user_id, status: 'PENDING' },
                    ],
                })
                .exec();

            const requestedIds = activeRequests.map((r) =>
                String(r.sender) === String(user_id) ? r.receiver : r.sender
            );
            const requestedIdStrings = requestedIds.map(String);

            // Исключаем из поиска компаньонов, пользователей с заявками в друзья и текущего пользователя
            const findResult = users.filter((user) => {
                const idStr = String(user._id);
                return (
                    !companionIds.includes(idStr) &&
                    idStr !== String(user_id) &&
                    !requestedIdStrings.includes(idStr)
                );
            });

            return findResult;
        }

        return users;
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

    async addRoleByName(userId: MongoSchema.Types.ObjectId, roleName: string): Promise<User> {
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

    async removeRoleByName(userId: MongoSchema.Types.ObjectId, roleName: string): Promise<User> {
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
