import UserModel from "@/database/models/User";
import CompanionsModel from "@/database/models/Сompanions";
import { IUser } from "@/database/types/User";

export const userResolvers = {
    Query: {
        users: async () => {
            return UserModel.find({});
        },
        user: async (parent: any, { id, ...rest }: { id: string }) => {
            return UserModel.findById(id);
        },

        // findUsers: async (parent: any, { email, name }: { email?: string; name?: string }) => {
        //     const filters: any = {};

        //     if (email) filters.email = email;

        //     if (name) {
        //         filters.name = { $regex: name, $options: "i" }; // 'i' — игнорировать регистр
        //     }

        //     return await UserModel.find(filters);
        // },

        findUsers: async (
            parent: any,
            { email, name, user_id }: { email?: string; name?: string; user_id: string },
        ) => {
            const companions = await CompanionsModel.findOne({ user_id });

            if (!companions || !companions.companions || companions.companions.length === 0) {
                return [];
            }

            //Приводим ObjectId[] к string[];
            const companionIds = companions.companions.map(String);

            const filters: any = {};

            if (email) filters.email = email;

            if (name) {
                filters.name = { $regex: name, $options: "i" }; // 'i' — игнорировать регистр
            }

            let users = await UserModel.find(filters);
            // исключаем друзей из результатов поиска
            const findResult = users.filter((user) => {
                const idStr = String(user._id);
                return !companionIds.includes(idStr) && idStr !== user_id;
            });

            return findResult;
        },
    },

    Mutation: {
        updateUser: async (parent: any, { id, user }: { id: string; user: IUser }) => {
            await UserModel.updateOne({ _id: id }, user);
            return await UserModel.findById(id);
        },
    },
};
