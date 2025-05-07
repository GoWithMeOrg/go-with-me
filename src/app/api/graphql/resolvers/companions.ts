import CompanionRequest from "@/database/models/CompanionRequest";
import CompanionsModel from "@/database/models/Сompanions";

export const companionsResolvers = {
    Query: {
        companions: async (_: any, { userId }: { userId: string }) => {
            const companions = await CompanionsModel.findOne({ user_id: userId }).populate("companions");

            if (!companions) {
                return [];
            }

            return companions.companions;
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
