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

export interface Invited {
    user: mongoose.Types.ObjectId;
    invitation: mongoose.Types.ObjectId;
    status: InvitationResponseStatus;
    respondedAt?: Date;
}
export interface InvitedDocument extends Document {
    user: Types.ObjectId;
    invitation: Types.ObjectId;
    status: InvitationResponseStatus;
    respondedAt?: Date;
}

export interface Invitation {
    id: string;
    event: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvitationDocument extends Document {
    event: Types.ObjectId;
    sender: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
