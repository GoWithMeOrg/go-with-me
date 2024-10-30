import UserModel from "@/database/models/User";

export const userResolvers = {
    Query: {
        users: async () => {
            return UserModel.find({});
        },
        user: async (parent: any, { id, ...rest }: { id: string }) => {
            return UserModel.findById(id);
        },
    },

    Mutation: {
        updateUser: async (parent: any, { id, user }: { id: string; user: any }) => {
            await UserModel.updateOne({ _id: id }, user);
            return await UserModel.findById(id);
        },
    },
};
