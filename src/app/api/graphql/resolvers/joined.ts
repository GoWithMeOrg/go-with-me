import EventModel from "@/database/models/Event";
import JoinedModel from "@/database/models/Joined";
import { IResolvers } from "@graphql-tools/utils";
import mongoose from "mongoose";

export const joinedResolvers: IResolvers = {
    Query: {
        joinedByUsers: async (parent: any, { event_id }: { event_id: string }) => {
            const eventObjectId = new mongoose.Types.ObjectId(event_id);
            return await JoinedModel.find({ event_id: eventObjectId });
        },

        joinedByUser: async (parent: any, { event_id, user_id }: { event_id: string; user_id: string }) => {
            const eventObjectId = new mongoose.Types.ObjectId(event_id);
            const userObjectId = new mongoose.Types.ObjectId(user_id);

            return await JoinedModel.findOne({ event_id: eventObjectId, user_id: userObjectId });
        },
    },

    Mutation: {
        joinEvent: async (parent: any, { event_id, user_id }: { event_id: string; user_id: string }) => {
            const userObjectId = new mongoose.Types.ObjectId(user_id);
            const eventObjectId = new mongoose.Types.ObjectId(event_id);

            console.log("Получены данные:", { event_id, user_id });

            // Проверяем, существует ли событие
            const eventExists = await EventModel.findById(eventObjectId);
            if (!eventExists) {
                throw new Error("Event not found");
            }

            // Проверяем, есть ли уже запись
            const existingJoin = await JoinedModel.findOne({ event_id: eventObjectId, user_id: userObjectId });

            if (existingJoin) {
                console.log("Удаляем пользователя из события:", existingJoin);
                await JoinedModel.deleteOne({ event_id: eventObjectId, user_id: userObjectId });
                return null;
            } else {
                // Добавляем запись
                const newJoin = new JoinedModel({
                    event_id: eventObjectId,
                    user_id: userObjectId,
                    joined: true,
                });

                console.log("Создаём новую запись:", newJoin);

                await newJoin.save();

                // Только возвращаем ID пользователя, а не весь объект
                return {
                    ...newJoin.toObject(),
                    user_id: newJoin.user_id.toString(),
                };
            }
        },
    },
};
