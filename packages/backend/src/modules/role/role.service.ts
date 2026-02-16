import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

import { Role, RoleDocument } from './entities/role.entity';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name)
        private roleModel: Model<RoleDocument>,
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {}

    // Хелпер для повторяющегося глубокого populate
    private get deepPopulate() {
        return {
            path: 'permissions',
            populate: { path: 'resource' },
        };
    }

    async getRoles(): Promise<Role[]> {
        return this.roleModel.find().populate(this.deepPopulate).exec();
    }

    async getRoleByName(roleName: string): Promise<Role | null> {
        return this.roleModel.findOne({ name: roleName }).populate(this.deepPopulate).exec();
    }

    async getRoleById(id: MongoSchema.Types.ObjectId): Promise<Role | null> {
        return this.roleModel.findById(id).populate(this.deepPopulate).exec();
    }

    async getRoleByUserId(userId: MongoSchema.Types.ObjectId): Promise<User | null> {
        return this.userModel.findById(userId).populate('roles').exec();
    }

    async getRolesByIds(roleIds: string[]) {
        return this.roleModel.find({ _id: { $in: roleIds } }).exec();
    }

    async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
        const existingRole = await this.roleModel.findOne({ name: createRoleInput.name }).exec();

        if (existingRole) {
            throw new ConflictException(`Role with name '${createRoleInput.name}' already exists`);
        }

        const createdRole = new this.roleModel({
            name: createRoleInput.name,
            permissions: createRoleInput.permissionIds || [],
            description: createRoleInput.description,
        });

        const savedRole = await createdRole.save();

        return await savedRole.populate(this.deepPopulate);
    }

    async addPermission(
        roleId: MongoSchema.Types.ObjectId,
        permissionId: MongoSchema.Types.ObjectId[]
    ): Promise<Role> {
        const role = await this.roleModel
            .findByIdAndUpdate(roleId, { $addToSet: { permissions: permissionId } }, { new: true })
            .populate({
                path: 'permissions',
                populate: { path: 'resource' },
            });

        if (!role) throw new NotFoundException('Role not found');
        return role;
    }

    async removePermission(
        roleId: MongoSchema.Types.ObjectId,
        permissionId: MongoSchema.Types.ObjectId
    ): Promise<Role> {
        const role = await this.roleModel
            .findByIdAndUpdate(roleId, { $pull: { permissions: permissionId } }, { new: true })
            .populate({ path: 'permissions', populate: { path: 'resource' } });

        if (!role) {
            throw new NotFoundException(`Role with ID ${roleId} not found`);
        }

        return role;
    }

    async updateRole(
        id: MongoSchema.Types.ObjectId,
        updateRoleInput: UpdateRoleInput
    ): Promise<Role | null> {
        const existingRole = await this.roleModel.findById(id).exec();
        if (!existingRole) throw new NotFoundException('Role not found');

        if (updateRoleInput.name && updateRoleInput.name !== existingRole.name) {
            const conflictingRole = await this.roleModel
                .findOne({ name: updateRoleInput.name })
                .exec();
            if (conflictingRole) {
                throw new ConflictException(
                    `Role with name '${updateRoleInput.name}' already exists`
                );
            }
        }

        Object.assign(existingRole, updateRoleInput);
        const updatedRole = await existingRole.save();
        return updatedRole.populate(this.deepPopulate);
    }

    async removeRole(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.roleModel.deleteOne({ _id: id }).exec();
    }
}
