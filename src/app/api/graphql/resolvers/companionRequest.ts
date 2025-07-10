import CompanionRequest from "@/database/models/CompanionRequest";
import CompanionsModel from "@/database/models/Сompanions";
import { CompanionRequestStatus } from "@/database/types/CompanionRequest";
import mongoose from "mongoose";

export const companionRequestResolvers = {
    Query: {
        getApplications: async (parent: any, { userId }: { userId: string }) => {
            return await CompanionRequest.find({
                $or: [
                    // { sender: userId, status: "pending" },
                    { receiver: userId, status: "pending" },
                ],
            })
                // .populate("sender")
                .populate("receiver");
        },

        getApplication: async (parent: any, { user_id, receiver_id }: { user_id: string; receiver_id: string }) => {
            return await CompanionRequest.findOne({
                $or: [
                    { sender: user_id, receiver: receiver_id },
                    { sender: receiver_id, receiver: user_id },
                ],
            })
                .populate("sender")
                .populate("receiver");
        },
    },

    Mutation: {
        companionRequest: async (parent: any, { senderId, receiverId }: { senderId: string; receiverId: string }) => {
            if (senderId === receiverId) {
                throw new Error("Нельзя отправить запрос самому себе");
            }

            // Проверка на уже существующую дружбу
            const existingCompanions = await CompanionsModel.findOne({ user_id: senderId });
            if (existingCompanions?.companions.includes(new mongoose.Types.ObjectId(receiverId))) {
                throw new Error("Пользователь уже у вас в друзьях");
            }

            // Проверка на уже существующий активный запрос
            const existingRequest = await CompanionRequest.findOne({
                $or: [
                    { sender: senderId, receiver: receiverId, status: "pending" },
                    { sender: receiverId, receiver: senderId, status: "pending" },
                ],
            });

            if (existingRequest) {
                throw new Error("Запрос уже существует");
            }

            // Создание новой заявки
            const newRequest = new CompanionRequest({
                sender: senderId,
                receiver: receiverId,
                status: CompanionRequestStatus.PENDING,
            });

            return await newRequest.save();
        },

        acceptCompanionRequest: async (_: any, { requestId }: { requestId: string }) => {
            const request = await CompanionRequest.findById(requestId);
            if (!request) {
                throw new Error("Заявка не найдена");
            }

            if (request.status !== "pending") {
                throw new Error("Заявка уже обработана");
            }

            request.status = CompanionRequestStatus.ACCEPTED;
            request.updatedAt = new Date();

            const senderId = new mongoose.Types.ObjectId(request.sender);
            const receiverId = new mongoose.Types.ObjectId(request.receiver);

            // Обновляем список друзей отправителя
            await CompanionsModel.updateOne(
                { user_id: senderId },
                { $addToSet: { companions: receiverId } },
                { upsert: true },
            );

            // Обновляем список друзей получателя
            await CompanionsModel.updateOne(
                { user_id: receiverId },
                { $addToSet: { companions: senderId } },
                { upsert: true },
            );

            return await request.save();
        },

        rejectCompanionRequest: async (_: any, { requestId }: { requestId: string }) => {
            const request = await CompanionRequest.findById(requestId);

            if (!request) {
                throw new Error("Заявка не найдена");
            }
            return await CompanionRequest.findByIdAndDelete(requestId);
        },
    },
};
