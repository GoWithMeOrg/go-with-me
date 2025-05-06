import CompanionRequest from "@/database/models/CompanionRequest";
import UserModel from "@/database/models/User";
import mongoose from "mongoose";

export const companionRequestResolvers = {
    Query: {
        getApplications: async (parent: any, { userId }: { userId: string }) => {
            return await CompanionRequest.find({
                $or: [
                    { sender: userId, status: "pending" },
                    { receiver: userId, status: "pending" },
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

            const existingRequest = await CompanionRequest.findOne({
                $or: [
                    { sender: senderId, receiver: receiverId, status: "pending" },
                    { sender: receiverId, receiver: senderId, status: "pending" },
                ],
            });

            if (existingRequest) {
                throw new Error("Запрос уже существует");
            }

            const newRequest = new CompanionRequest({
                sender: senderId,
                receiver: receiverId,
                status: "pending",
            });

            return await newRequest.save();
        },

        acceptCompanionRequest: async (_: any, { requestId }: { requestId: string }) => {
            const request = await CompanionRequest.findById(requestId);
            console.log(request);
            if (!request) {
                throw new Error("Заявка не найдена");
            }

            if (request.status !== "pending") {
                throw new Error("Заявка уже обработана");
            }

            request.status = "accepted";
            request.updatedAt = new Date();

            await UserModel.updateOne({ _id: request.sender }, { $addToSet: { companions_id: request.receiver } });

            await UserModel.updateOne({ _id: request.receiver }, { $addToSet: { companions_id: request.sender } });

            return await request.save();
        },

        rejectCompanionRequest: async (_: any, { requestId }: { requestId: string }) => {
            return await CompanionRequest.findByIdAndDelete({ _id: requestId });
        },
    },
};
