import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Schema as MongoSchema } from 'mongoose';

import { Permission, PermissionDocument } from './entities/permission.entity';
import { Resource } from '../resource/entities/resource.entity';
import { Action } from './enums/action.enum';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class PermissionService {
    constructor(
        @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
        @InjectModel(Resource.name) private resourceModel: Model<Resource>,
        @InjectModel(Role.name) private roleModel: Model<Role>
    ) {}

    async createResourcePermissions(resourceId: MongoSchema.Types.ObjectId) {
        // 1. Проверяем, существует ли ресурс вообще
        const resource = await this.resourceModel.findById(resourceId);
        if (!resource) {
            throw new NotFoundException('Resource not found');
        }

        // 2. Определяем стандартный набор действий
        const allActions = Object.values(Action);

        // 3. Ищем, какие права уже созданы для этого ресурса
        const existingPermissions = await this.permissionModel
            .find({
                resource: resourceId,
            })
            .exec();

        const existingActions = existingPermissions.map((p) => p.action);

        // 4. Фильтруем те, которых не хватает
        const missingActions = allActions.filter((action) => !existingActions.includes(action));

        // 5. Если чего-то не хватает — создаем пачкой (Bulk Insert)
        if (missingActions.length > 0) {
            const newPermissions = missingActions.map((action) => ({
                action,
                resource: resourceId,
                name: `${action.toLowerCase()}_${resource.slug.toLowerCase()}`, // Например: read_user
                description: `Can ${action.toLowerCase()} ${resource.name}`,
                isActive: true,
            }));

            await this.permissionModel.insertMany(newPermissions);
        }

        // 6. Возвращаем полный список прав (старые + новые)
        return this.permissionModel.find({ resource: resourceId }).exec();
    }

    async togglePermissionStatus(id: MongoSchema.Types.ObjectId) {
        const permission = await this.permissionModel.findById(id).exec();

        if (!permission) {
            throw new NotFoundException(`Permission with ID ${id} not found`);
        }

        permission.isActive = !permission.isActive;

        // При сохранении Mongoose проверит валидность и вернет обновленный объект
        return permission.save();
    }

    async getAllPermissions(): Promise<Permission[]> {
        return this.permissionModel.find().populate('resource').exec();
    }

    async getPermissionByName(permissionName: string): Promise<Permission | null> {
        return this.permissionModel.findOne({ name: permissionName }).populate('resource').exec();
    }

    async getPermissionById(id: Types.ObjectId): Promise<Permission | null> {
        return this.permissionModel.findById(id).populate('resource').exec();
    }
}
