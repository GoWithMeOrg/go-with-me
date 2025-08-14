import mongoose from "mongoose";

import CompanionRequest from "@/database/models/CompanionRequest";
import CompanionsModel from "@/database/models/Сompanions";
import { IUser } from "@/database/types/User";

export const companionsResolvers = {
    Query: {
        companions: async (_: any, { user_id, limit }: { user_id: string; limit?: number }) => {
            const companions = await CompanionsModel.findOne({ user_id }).populate({
                path: "companions",
                options: limit ? { limit } : {},
            });

            const allCompanions = await CompanionsModel.findOne({ user_id }).lean();
            const totalCompanions = allCompanions?.companions?.length ?? 0;

            if (!companions) {
                return {
                    companions: [],
                    totalCompanions: 0,
                };
            }
            return { companions: companions.companions, totalCompanions };
        },

        isUserCompanion: async (parent: any, { user_id, companion_id }: { user_id: string; companion_id: string }) => {
            // Проверяем наличие companion_id в массиве companions
            const exists = await CompanionsModel.exists({
                user_id,
                companions: new mongoose.Types.ObjectId(companion_id),
            });

            // возвращает булевое значение
            return !!exists;
        },

        findCompanion: async (
            parent: any,
            { user_id, email, name }: { user_id: string; email?: string; name?: string },
        ) => {
            const userCompanions = await CompanionsModel.findOne({ user_id }).populate<{ companions: IUser[] }>(
                "companions",
            );

            if (
                !userCompanions ||
                !Array.isArray(userCompanions.companions) ||
                userCompanions.companions.length === 0
            ) {
                return [];
            }

            // Фильтруем прямо по массиву
            let companions = userCompanions.companions;

            if (email) companions = companions.filter((c) => c.email === email);

            if (name) {
                const regex = new RegExp(name, "i");
                companions = companions.filter((c) => regex.test(c.name));
            }

            return companions;
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
