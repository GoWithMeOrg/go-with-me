import CompanionRequest from "@/database/models/CompanionRequest";

export const companionRequestResolvers = {
    Query: {
        getApplications: async (parent: any, { userId }: { userId: string }) => {
            return await CompanionRequest.find({
                $or: [{ sender: userId }, { receiver: userId }],
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

        acceptCompanionRequest: async (_: any, { requestId }: { requestId: string }) => {
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

        rejectCompanionRequest: async (_: any, { requestId }: { requestId: string }) => {
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
