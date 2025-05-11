import mongoose, { Model, Schema } from "mongoose";
import { InvitationDocument, InvitationReceiver, InvitationResponseStatus } from "@/database/types/Invitation";

const InvitationReceiverSchema = new Schema<InvitationReceiver>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(InvitationResponseStatus),
            default: InvitationResponseStatus.INVITED,
            required: true,
        },
        respondedAt: {
            type: Date,
        },
    },
    { _id: false },
);

const InvitationSchema = new Schema<InvitationDocument>(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receivers: {
            type: [InvitationReceiverSchema],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const InvitationModel: Model<InvitationDocument> =
    mongoose.models?.Invitation || mongoose.model<InvitationDocument>("Invitation", InvitationSchema);
