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
    },
};
