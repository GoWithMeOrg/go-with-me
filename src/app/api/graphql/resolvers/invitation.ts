import { InvitationModel, InvitedModel } from "@/database/models/Invitation";
import { InvitationResponseStatus } from "@/database/types/Invitation";
import mongoose from "mongoose";

type RespondArgs = {
    eventId: string;
    senderId: string;
    receiverIds: string[];
};

export const invitationResolvers = {
    Query: {
        //Получаем все инвайты

        // async getInvitation(parent: any, { userId }: { userId: string }) {
        //     // Ищем все записи в коллекции Invited, где пользователь пригашён
        //     const inviteds = await InvitedModel.find({ user: userId })
        //         .populate("invitation") // Заполняем связанные инвайты
        //         .populate("invitation.sender") // Заполняем отправителя инвайта
        //         .populate("invitation.event"); // Заполняем событие инвайта

        //     console.log(inviteds.map((record) => record.toObject()));
        //     return inviteds.map((record) => record);
        // },

        async getInvitation(parent: any, { userId }: { userId: string }) {
            // Ищем все записи в коллекции Invited, где пользователь пригашён
            const inviteds = await InvitedModel.find({ user: userId }).populate({
                path: "invitation",
                populate: [
                    { path: "sender" }, // Популяция отправителя с полем 'name'
                    { path: "event" }, // Популяция события с нужными полями
                ],
            });

            console.log(inviteds.map((record) => record.toObject()));

            return inviteds.map((record) => record);
        },
    },

    Mutation: {
        async respondToInvitation(_: any, { eventId, senderId, receiverIds }: RespondArgs) {
            const eventObjectId = new mongoose.Types.ObjectId(eventId);
            const senderObjectId = new mongoose.Types.ObjectId(senderId);

            // Ищем приглашение
            let invitation = await InvitationModel.findOne({
                event: eventObjectId,
                sender: senderObjectId,
            });

            // Если приглашения нет, создаём его
            if (!invitation) {
                invitation = await InvitationModel.create({
                    event: eventObjectId,
                    sender: senderObjectId,
                });
            }

            // Ищем уже существующих приглашённых
            const existingInvited = await InvitedModel.find({ invitation: invitation._id });
            const existingUserIds = existingInvited.map((invited) => invited.user.toString());

            // Фильтруем новых пользователей
            const newUserIds = receiverIds.filter((userId) => !existingUserIds.includes(userId));

            // Создаём новые документы в коллекции Invited
            const newInvitedDocs = await InvitedModel.insertMany(
                newUserIds.map((userId) => ({
                    user: new mongoose.Types.ObjectId(userId),
                    invitation: invitation._id,
                    status: InvitationResponseStatus.INVITED,
                })),
            );

            // Возвращаем обновлённое приглашение с подробной информацией
            return InvitationModel.findById(invitation._id).populate("sender").populate("event");
        },

        acceptInvitation: async (_: any, { invitationId, userId }: { invitationId: string; userId: string }) => {
            const invited = await InvitedModel.findOne({ invitation: invitationId, user: userId });

            if (!invited) {
                throw new Error("Инвайт не найден для этого пользователя");
            }

            console.log(invited);
            invited.status = InvitationResponseStatus.ACCEPTED;
            invited.respondedAt = new Date();
            invited.updatedAt = new Date();

            await invited.save();

            return await InvitedModel.findOne({ invitation: invitationId, user: userId });
        },

        declineInvitation: async (_: any, { invitationId, userId }: { invitationId: string; userId: string }) => {
            const invited = await InvitedModel.findOne({ invitation: invitationId, user: userId });

            if (!invited) {
                throw new Error("Инвайт не найден для этого пользователя");
            }

            console.log(invited);
            invited.status = InvitationResponseStatus.DECLINED;
            invited.respondedAt = new Date();
            invited.updatedAt = new Date();

            await invited.save();

            return await InvitedModel.findOne({ invitation: invitationId, user: userId });
        },
    },
};
