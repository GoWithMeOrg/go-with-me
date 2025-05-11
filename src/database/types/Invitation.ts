import mongoose, { Types } from "mongoose";

export enum ConditionEvent {
    CANCELED = "Canceled",
    FINALIZED = "Finalized",
}

export enum InvitationResponseStatus {
    INVITED = "Invited",
    ACCEPTED = "Accepted",
    DECLINED = "Declined",
}

export interface InvitationReceiver {
    user: mongoose.Types.ObjectId;
    status: InvitationResponseStatus;
    respondedAt?: Date;
}

export interface Invitation {
    id: string;
    event_id: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    receivers: InvitationReceiver[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvitationDocument extends Document {
    event_id: Types.ObjectId;
    sender: Types.ObjectId;
    receivers: InvitationReceiver[];
    createdAt?: Date;
    updatedAt?: Date;
}
