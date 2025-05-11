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
        async getInvitation(parent: any, { id }: { id: string }) {
            return InvitationModel.findById(id).populate("sender").populate("event").populate("receivers.user");
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
