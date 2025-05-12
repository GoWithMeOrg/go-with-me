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
        // async respondToInvitation(_: any, { eventId, senderId, receiverIds }: RespondArgs) {
        //     const eventObjectId = new mongoose.Types.ObjectId(eventId);
        //     const senderObjectId = new mongoose.Types.ObjectId(senderId);

        //     let invitation = await InvitationModel.findOne({
        //         event: eventObjectId,
        //         sender: senderObjectId,
        //     });

        //     if (!invitation) {
        //         invitation = await InvitationModel.create({
        //             event: eventObjectId,
        //             sender: senderObjectId,
        //         });
        //     }

        //     // найти уже существующих приглашённых по этому приглашению
        //     const existingInvited = await InvitedModel.find({ invitation: invitation._id });
        //     const existingUserIds = existingInvited.map((invited) => invited.user.toString());

        //     // добавить новых приглашённых
        //     const newInvites = receiverIds.filter((userId) => !existingUserIds.includes(userId));
        //     await InvitedModel.insertMany(
        //         newInvites.map((userId) => ({
        //             user: new mongoose.Types.ObjectId(userId),
        //             invitation: invitation._id,
        //             status: InvitationResponseStatus.INVITED,
        //         })),
        //     );

        //     // вернуть приглашение с отправителем и событием
        //     return InvitationModel.findById(invitation._id).populate("sender").populate("event");
        // },

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

        // acceptInvitation: async (_: any, { invitationId, userId }: { invitationId: string; userId: string }) => {
        //     // Находим приглашение по ID
        //     const invitation = await InvitationModel.findById(invitationId);
        //     if (!invitation) {
        //         throw new Error("Инвайт не найден");
        //     }

        //     // Ищем получателя по userId в массиве receivers
        //     const receiverIndex = invitation.receivers.findIndex((receiver) => {
        //         return receiver.user.toString() === userId; // Находим получателя по userId
        //     });

        //     // Если получатель не найден
        //     if (receiverIndex === -1) {
        //         throw new Error("Получатель не найден в этом приглашении");
        //     }

        //     // Обновляем статус получателя на ACCEPTED
        //     invitation.receivers[receiverIndex].status = InvitationResponseStatus.ACCEPTED;
        //     invitation.receivers[receiverIndex].respondedAt = new Date(); // Устанавливаем дату ответа

        //     // Обновляем дату изменения приглашения
        //     invitation.updatedAt = new Date();

        //     // Сохраняем изменения
        //     await invitation.save();

        //     // Возвращаем обновленное приглашение
        //     return InvitationModel.findById(invitation._id)
        //         .populate("sender")
        //         .populate("event")
        //         .populate("receivers.user");
        // },

        // declineInvitation: async (_: any, { invitationId, userId }: { invitationId: string; userId: string }) => {
        //     // Находим приглашение по ID
        //     const invitation = await InvitationModel.findById(invitationId);
        //     if (!invitation) {
        //         throw new Error("Инвайт не найден");
        //     }

        //     // Ищем получателя по userId в массиве receivers
        //     const receiverIndex = invitation.receivers.findIndex((receiver) => {
        //         return receiver.user.toString() === userId; // Находим получателя по userId
        //     });

        //     // Если получатель не найден
        //     if (receiverIndex === -1) {
        //         throw new Error("Получатель не найден в этом приглашении");
        //     }

        //     // Обновляем статус получателя на ACCEPTED
        //     invitation.receivers[receiverIndex].status = InvitationResponseStatus.DECLINED;
        //     invitation.receivers[receiverIndex].respondedAt = new Date(); // Устанавливаем дату ответа

        //     // Обновляем дату изменения приглашения
        //     invitation.updatedAt = new Date();

        //     // Сохраняем изменения
        //     await invitation.save();

        //     // Возвращаем обновленное приглашение
        //     return InvitationModel.findById(invitation._id)
        //         .populate("sender")
        //         .populate("event")
        //         .populate("receivers.user");
        // },
    },
};
