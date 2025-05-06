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

        getApplications: async (parent: any, { userId }: { userId: string }) => {
            return await CompanionRequest.find({
                $or: [{ sender: userId }, { receiver: userId }],
            })
                .populate("sender")
                .populate("receiver");
        },
    },

    Mutation: {
        updateUser: async (parent: any, { id, user }: { id: string; user: IUser }) => {
            await UserModel.updateOne({ _id: id }, user);
            return await UserModel.findById(id);
        },

        companionRequest: async (parent: any, { senderId, receiverId }: { senderId: string; receiverId: string }) => {
            if (senderId === receiverId) {
                throw new Error("Нельзя отправить запрос самому себе");
            }

            const existingRequest = await CompanionRequest.findOne({
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId },
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

        acceptFriendRequest: async (_: any, { requestId }: { requestId: string }) => {
            const request = await CompanionRequest.findById(requestId);

            if (!request) {
                throw new Error("Заявка не найдена");
            }

            if (request.status !== "pending") {
                throw new Error("Заявка уже обработана");
            }

            request.status = "accepted";
            request.updatedAt = new Date();

            return await request.save();
        },

        rejectFriendRequest: async (_: any, { requestId }: { requestId: string }) => {
            const request = await CompanionRequest.findById(requestId);

            if (!request) {
                throw new Error("Заявка не найдена");
            }

            if (request.status !== "pending") {
                throw new Error("Заявка уже обработана");
            }

            request.status = "rejected";
            request.updatedAt = new Date();

            return await request.save();
        },
    },
};
