import CompanionRequest from "@/database/models/CompanionRequest";
import UserModel from "@/database/models/User";
import CompanionsModel from "@/database/models/Сompanions";

export const companionsResolvers = {
    Query: {
        companions: async (_: any, { userId, limit }: { userId: string; limit?: number }) => {
            const companions = await CompanionsModel.findOne({ user_id: userId }).populate({
                path: "companions",
                options: limit ? { limit } : {},
            });

            if (!companions) {
                return [];
            }

            return companions.companions;
        },

        findCompanion: async (
            parent: any,
            { userId, email, name }: { userId: string; email?: string; name?: string },
        ) => {
            const companionDoc = await CompanionsModel.findOne({ user_id: userId }).populate("companions");

            if (!companionDoc || !companionDoc.companions || companionDoc.companions.length === 0) {
                return [];
            }

            const companionIds = companionDoc.companions.map((c: any) => c._id);

            const filters: any = { _id: { $in: companionIds } };

            if (email) {
                filters.email = email;
            }

            if (name) {
                filters.name = { $regex: name, $options: "i" };
            }

            return await UserModel.find(filters);
        },
    },

    Mutation: {
        removeCompanion: async (_: any, { userId, companionId }: { userId: string; companionId: string }) => {
            try {
                // находим активную заявку со статусом "accepted"
                const existingCompanion = await CompanionRequest.findOne({
                    $or: [
                        { sender: userId, receiver: companionId, status: "accepted" },
                        { sender: companionId, receiver: userId, status: "accepted" },
                    ],
                });

                console.log("Заявка найдена");

                if (!existingCompanion) {
                    console.log("Активная дружба не найдена");
                    return false;
                }

                // обновляем список друзей у пользователя (удаляем companionId)
                const userUpdate = await CompanionsModel.updateOne(
                    { user_id: userId }, // использован правильный идентификатор
                    { $pull: { companions: companionId } },
                );

                // обновляем список друзей у компаниона (удаляем userId)
                const companionUpdate = await CompanionsModel.updateOne(
                    { user_id: companionId }, // использован правильный идентификатор
                    { $pull: { companions: userId } },
                );

                // удаляем заявку о дружбе
                const deleted = await CompanionRequest.findByIdAndDelete(existingCompanion._id);

                // проверяем, что все обновления прошли успешно
                if (userUpdate.modifiedCount > 0 && companionUpdate.modifiedCount > 0 && !!deleted) {
                    return true;
                } else {
                    console.log("Не удалось обновить список друзей или удалить заявку");
                    return false;
                }
            } catch (error) {
                console.error("Ошибка при удалении друга:", error);
                return false;
            }
        },
    },
};
