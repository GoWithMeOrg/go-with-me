import { ConflictException, Injectable } from '@nestjs/common';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name)
        private roleModel: Model<RoleDocument>
    ) {}

    async getAllRoles(): Promise<Role[]> {
        return this.roleModel.find().populate('permissions').exec();
    }

    async getRoleByName(roleName: string): Promise<Role | null> {
        return this.roleModel.findOne({ name: roleName }).populate('permissions').exec();
    }

    async getRoleById(id: MongoSchema.Types.ObjectId): Promise<Role | null> {
        return this.roleModel.findById(id).populate('permissions').exec();
    }

    async getRolesByIds(roleIds: string[]) {
        return this.roleModel.find({ _id: { $in: roleIds } }).exec();
    }

    async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
        // Проверяем, существует ли уже роль с таким названием
        const existingRole = await this.roleModel
            .findOne({
                role: createRoleInput.name,
            })
            .exec();

        if (existingRole) {
            throw new ConflictException(`Role with name '${createRoleInput.name}' already exists`);
        }

        // Создаем новую роль с ID прав, если они указаны
        const createdRole = new this.roleModel({
            ...createRoleInput,
            permissions: createRoleInput.permissionIds || [],
        });

        const savedRole = await createdRole.save();

        return savedRole;
    }

    async updateRole(
        id: MongoSchema.Types.ObjectId,
        updateRoleInput: UpdateRoleInput
    ): Promise<Role | null> {
        const existingRole = await this.roleModel.findById(id).exec();

        if (!existingRole) {
            return null;
        }

        // Проверяем, не конфликтует ли новое имя роли с существующей
        if (updateRoleInput.name && updateRoleInput.name !== existingRole.name) {
            const conflictingRole = await this.roleModel
                .findOne({
                    role: updateRoleInput.name,
                })
                .exec();

            if (conflictingRole && conflictingRole._id !== id) {
                throw new ConflictException(
                    `Role with name '${updateRoleInput.name}' already exists`
                );
            }
        }

        // Обновляем только те поля, которые были переданы
        Object.assign(existingRole, updateRoleInput);

        return existingRole.save();
    }

    async removeRole(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.roleModel.deleteOne({ _id: id }).exec();
    }
}
