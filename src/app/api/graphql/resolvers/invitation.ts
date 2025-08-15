import EventModel from "@/database/models/Event";
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
        getInvitation: async (parent: any, { user_id }: { user_id: string }) => {
            // Ищем все записи в коллекции Invited, где пользователь приглашен
            const inviteds = await InvitedModel.find({ user: user_id }).populate({
                path: "invitation",
                populate: [
                    { path: "sender" }, // Популяция отправителя с полем 'name'
                    { path: "event" }, // Популяция события с нужными полями
                ],
            });

            return inviteds.map((record) => record);
        },

        companionInvitationEvent: async (_parent: any, args: { organizer_id: string; event_id: string }) => {
            // Получаем все события организатора, фильтруем и сортируем по дате
            const currentDate = new Date();
            const events = await EventModel.find({
                organizer_id: args.organizer_id,
                startDate: { $gte: currentDate },
            }).sort({ startDate: 1 }); // сортировка по дате

            // Получаем все события на которые принято приглашение
            const inviteds = await InvitedModel.find({
                user: args.organizer_id,
                status: "Accepted",
            }).populate({
                path: "invitation",
                populate: [{ path: "sender" }, { path: "event" }],
            });

            // Извлекаем события из приглашений
            const acceptedEvents = inviteds
                .map((invited) => invited.invitation?.event)
                .filter((event) => event != null);

            // Объединяем массивы событий
            const allEvents = [...events, ...acceptedEvents];

            return allEvents;
        },

        getDeclinedEvents: async (_: any, { userId }: { userId: string }) => {
            const declinedInvites = await InvitedModel.find({
                user: userId,
                status: InvitationResponseStatus.DECLINED,
            }).populate({
                path: "invitation",
                populate: { path: "event" },
            });

            const declinedEvents = declinedInvites.map((inv) => inv.invitation?.event).filter(Boolean); // фильтруем на случай если нет события

            return declinedEvents;
        },
    },

    Mutation: {
        async sendInvitation(_: any, { eventId, senderId, receiverIds }: RespondArgs) {
            const eventObjectId = new mongoose.Types.ObjectId(eventId);
            const senderObjectId = new mongoose.Types.ObjectId(senderId);

            let invitation = await InvitationModel.findOneAndUpdate(
                {
                    event: eventObjectId,
                    sender: senderObjectId,
                },
                {}, // no updates needed
                { upsert: true, new: true },
            );

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
            invited.respondedAt = invited.updatedAt = new Date();

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
