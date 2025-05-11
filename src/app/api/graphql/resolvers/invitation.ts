import { InvitationModel } from "@/database/models/Invitation";
import { InvitationResponseStatus } from "@/database/types/Invitation";
import mongoose from "mongoose";

type RespondArgs = {
    eventId: string;
    senderId: string;
    receiverIds: string[];
};

export const invitationResolvers = {
    Query: {
        async getInvitation(parent: any, { userId }: { userId: string }) {
            // const userObjectId = new mongoose.Types.ObjectId(userId);

            // Ищем все приглашения, где пользователь является получателем или отправителем
            const invitations = await InvitationModel.find({
                $or: [
                    { "receivers.user": userId }, // Пользователь в списке получателей
                    { sender: userId }, // Пользователь - отправитель
                ],
            })
                .populate("sender")
                .populate("event")
                .populate("receivers.user");

            return invitations;
        },

        async getInvitationsByEvent(parent: any, { eventId }: { eventId: string }) {
            return InvitationModel.find({ event: eventId })
                .populate("sender")
                .populate("event")
                .populate("receivers.user");
        },
    },

    Mutation: {
        async respondToInvitation(_: any, { eventId, senderId, receiverIds }: RespondArgs) {
            const eventObjectId = new mongoose.Types.ObjectId(eventId);
            const senderObjectId = new mongoose.Types.ObjectId(senderId);

            let invitation = await InvitationModel.findOne({
                event: eventObjectId,
                sender: senderObjectId,
            });

            if (!invitation) {
                invitation = await InvitationModel.create({
                    event: eventObjectId,
                    sender: senderObjectId,
                    receivers: receiverIds.map((userId) => ({
                        user: new mongoose.Types.ObjectId(userId),
                        status: InvitationResponseStatus.INVITED,
                    })),
                });
            } else {
                const existingUserIds = invitation.receivers.map((r) => r.user.toString());

                receiverIds.forEach((userId) => {
                    if (!existingUserIds.includes(userId)) {
                        invitation.receivers.push({
                            user: new mongoose.Types.ObjectId(userId),
                            status: InvitationResponseStatus.INVITED,
                        });
                    }
                });

                await invitation.save();
            }

            return InvitationModel.findById(invitation._id)
                .populate("sender")
                .populate("event")
                .populate("receivers.user");
        },

        acceptInvitation: async (_: any, { invitationId, userId }: { invitationId: string; userId: string }) => {
            // Находим приглашение по ID
            const invitation = await InvitationModel.findById(invitationId);
            if (!invitation) {
                throw new Error("Инвайт не найден");
            }

            // Ищем получателя по userId в массиве receivers
            const receiverIndex = invitation.receivers.findIndex((receiver) => {
                return receiver.user.toString() === userId; // Находим получателя по userId
            });

            // Если получатель не найден
            if (receiverIndex === -1) {
                throw new Error("Получатель не найден в этом приглашении");
            }

            // Обновляем статус получателя на ACCEPTED
            invitation.receivers[receiverIndex].status = InvitationResponseStatus.ACCEPTED;
            invitation.receivers[receiverIndex].respondedAt = new Date(); // Устанавливаем дату ответа

            // Обновляем дату изменения приглашения
            invitation.updatedAt = new Date();

            // Сохраняем изменения
            await invitation.save();

            // Возвращаем обновленное приглашение
            return InvitationModel.findById(invitation._id)
                .populate("sender")
                .populate("event")
                .populate("receivers.user");
        },

        declineInvitation: async (_: any, { invitationId, userId }: { invitationId: string; userId: string }) => {
            // Находим приглашение по ID
            const invitation = await InvitationModel.findById(invitationId);
            if (!invitation) {
                throw new Error("Инвайт не найден");
            }

            // Ищем получателя по userId в массиве receivers
            const receiverIndex = invitation.receivers.findIndex((receiver) => {
                return receiver.user.toString() === userId; // Находим получателя по userId
            });

            // Если получатель не найден
            if (receiverIndex === -1) {
                throw new Error("Получатель не найден в этом приглашении");
            }

            // Обновляем статус получателя на ACCEPTED
            invitation.receivers[receiverIndex].status = InvitationResponseStatus.DECLINED;
            invitation.receivers[receiverIndex].respondedAt = new Date(); // Устанавливаем дату ответа

            // Обновляем дату изменения приглашения
            invitation.updatedAt = new Date();

            // Сохраняем изменения
            await invitation.save();

            // Возвращаем обновленное приглашение
            return InvitationModel.findById(invitation._id)
                .populate("sender")
                .populate("event")
                .populate("receivers.user");
        },
    },
};
