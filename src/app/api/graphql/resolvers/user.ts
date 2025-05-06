import UserModel from "@/database/models/User";
import { IUser } from "@/database/types/User";
import CompanionRequest from "@/database/models/CompanionRequest";

export const userResolvers = {
    Query: {
        users: async () => {
            return UserModel.find({});
        },
        user: async (parent: any, { id, ...rest }: { id: string }) => {
            return UserModel.findById(id);
        },

        findUsers: async (parent: any, { email, name }: { email?: string; name?: string }) => {
            const filters: any = {};

            if (email) filters.email = email;

            if (name) {
                filters.name = { $regex: name, $options: "i" }; // 'i' — игнорировать регистр
            }

            return await UserModel.find(filters);
        },
    },

    Mutation: {
        updateUser: async (parent: any, { id, user }: { id: string; user: IUser }) => {
            await UserModel.updateOne({ _id: id }, user);
            return await UserModel.findById(id);
        },
    },
};
