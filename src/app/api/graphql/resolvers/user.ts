import CompanionRequest from "@/database/models/CompanionRequest";
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

        findUsers: async (
            parent: any,
            { email, name, user_id }: { email?: string; name?: string; user_id: string },
        ) => {
            // Фильтруем результат по имени и емайл
            const filters: any = {};

            if (email) filters.email = email;

            if (name) {
                filters.name = { $regex: name, $options: "i" }; // 'i' — игнорировать регистр
            }

            // Результат по имени или емайл
            let users = await UserModel.find(filters);

            // Получаем массив объект ид компаньонов пользователя
            const companions = await CompanionsModel.findOne({ user_id });

            if (!companions || !companions.companions || companions.companions.length === 0) {
                return [];
            }
            //Приводим ObjectId[] к string[];
            const companionIds = companions.companions.map(String);

            // исключаем друзей из результатов поиска
            // const findResultCompanions = users.filter((user) => {
            //     const idStr = String(user._id);
            //     return !companionIds.includes(idStr) && idStr !== user_id;
            // });

            // Ищем заявки в друзья
            const activeRequests = await CompanionRequest.find({
                $or: [
                    { sender: user_id, status: "pending" },
                    { receiver: user_id, status: "pending" },
                ],
            });

            const requestedIds = activeRequests.map((r) => (String(r.sender) === user_id ? r.receiver : r.sender));
            const requestedIdStrings = requestedIds.map(String);

            // исключаем из поиска компанионов и пользователей с заявками в друзья
            const findResult = users.filter((user) => {
                const idStr = String(user._id);
                return !companionIds.includes(idStr) && idStr !== user_id && !requestedIdStrings.includes(idStr);
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
