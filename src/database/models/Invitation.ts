import mongoose, { model, Model, Schema, Types } from "mongoose";
import { InvitationDocument, InvitationResponseStatus, InvitedDocument } from "@/database/types/Invitation";

const InvitedSchema = new Schema<InvitedDocument>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        invitation: {
            type: Schema.Types.ObjectId,
            ref: "Invitation",
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
    { timestamps: true },
);

export const InvitedModel = mongoose.models?.Invited || model<InvitedDocument>("Invited", InvitedSchema);

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
    },
    {
        timestamps: true,
    },
);

export const InvitationModel: Model<InvitationDocument> =
    mongoose.models?.Invitation || mongoose.model<InvitationDocument>("Invitation", InvitationSchema);
