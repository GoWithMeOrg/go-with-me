import RoleModel from "@/database/models/Role";
import { Action, Resource } from "@/database/types/Permission";

export const roleResolvers = {
    Query: {
        roles: async () => {
            try {
                const roles = await RoleModel.find({}).sort({ name: 1 });
                return roles;
            } catch (error) {
                throw new Error(`Failed to fetch roles: ${error}`);
            }
        },
        role: async (_: any, { id }: { id: string }) => {
            try {
                const role = await RoleModel.findById(id);
                if (!role) {
                    throw new Error(`Role with id ${id} not found`);
                }
                return role;
            } catch (error) {
                throw new Error(`Failed to fetch role: ${error}`);
            }
        },
    },
    Mutation: {
        createRole: async (_: any, { role }: { role: any }) => {
            try {
                // Validate permissions
                role.permissions.forEach((permission: any) => {
                    if (!Object.values(Resource).includes(permission.resource)) {
                        throw new Error(`Invalid resource: ${permission.resource}`);
                    }
                    permission.actions.forEach((action: string) => {
                        if (!Object.values(Action).includes(action as Action)) {
                            throw new Error(`Invalid action: ${action}`);
                        }
                    });
                });

                const newRole = new RoleModel(role);
                const savedRole = await newRole.save();
                return savedRole;
            } catch (error) {
                if (error instanceof Error && error.message.includes("duplicate key")) {
                    throw new Error(`Role with name "${role.name}" already exists`);
                }
                throw new Error(`Failed to create role: ${error}`);
            }
        },
        updateRole: async (_: any, { id, role }: { id: string; role: any }) => {
            try {
                // Validate permissions
                role.permissions.forEach((permission: any) => {
                    if (!Object.values(Resource).includes(permission.resource)) {
                        throw new Error(`Invalid resource: ${permission.resource}`);
                    }
                    permission.actions.forEach((action: string) => {
                        if (!Object.values(Action).includes(action as Action)) {
                            throw new Error(`Invalid action: ${action}`);
                        }
                    });
                });

                const updatedRole = await RoleModel.findByIdAndUpdate(id, role, { new: true, runValidators: true });

                if (!updatedRole) {
                    throw new Error(`Role with id ${id} not found`);
                }

                return updatedRole;
            } catch (error) {
                if (error instanceof Error && error.message.includes("duplicate key")) {
                    throw new Error(`Role with name "${role.name}" already exists`);
                }
                throw new Error(`Failed to update role: ${error}`);
            }
        },
        deleteRole: async (_: any, { id }: { id: string }) => {
            try {
                const deletedRole = await RoleModel.findByIdAndDelete(id);
                if (!deletedRole) {
                    throw new Error(`Role with id ${id} not found`);
                }
                return true;
            } catch (error) {
                throw new Error(`Failed to delete role: ${error}`);
            }
        },
    },
};
