import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';

import { Permission, PermissionDocument } from './entities/permission.entity';

import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';

@Injectable()
export class PermissionService {
    constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) {}

    async getAllPermissions(): Promise<Permission[]> {
        return this.permissionModel.find().exec();
    }

    async getPermissionByName(permissionName: string): Promise<Permission | null> {
        return this.permissionModel.findOne({ name: permissionName }).exec();
    }

    async getPermissionById(id: MongoSchema.Types.ObjectId): Promise<Permission | null> {
        return this.permissionModel.findById(id).exec();
    }

    async createPermission(createPermissionInput: CreatePermissionInput): Promise<Permission> {
        // Проверяем, существует ли уже право с таким названием
        const existingPermission = await this.permissionModel
            .findOne({
                permission: createPermissionInput.name,
            })
            .exec();

        if (existingPermission) {
            throw new ConflictException(
                `Permission with name '${createPermissionInput.name}' already exists`
            );
        }

        const createdPermission = new this.permissionModel(createPermissionInput);
        return createdPermission.save();
    }

    async updatePermission(
        id: MongoSchema.Types.ObjectId,
        updatePermissionInput: UpdatePermissionInput
    ): Promise<Permission | null> {
        const existingPermission = await this.permissionModel.findById(id).exec();

        if (!existingPermission) {
            return null;
        }

        // Проверяем, не конфликтует ли новое право с существующей
        if (updatePermissionInput.name && updatePermissionInput.name !== existingPermission.name) {
            const conflictingPermission = await this.permissionModel
                .findOne({
                    Permission: updatePermissionInput.name,
                })
                .exec();

            if (conflictingPermission && conflictingPermission._id !== id) {
                throw new ConflictException(
                    `Permission with name '${updatePermissionInput.name}' already exists`
                );
            }
        }

        // Обновляем только те поля, которые были переданы
        Object.assign(existingPermission, updatePermissionInput);

        return existingPermission.save();
    }

    async removePermission(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.permissionModel.deleteOne({ _id: id }).exec();
    }
}
