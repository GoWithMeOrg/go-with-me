import mongoose from "mongoose";

export enum CompanionRequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}
export interface ICompanionRequest {
    id: string;
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    status: CompanionRequestStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICompanionRequestDocument extends ICompanionRequest, Document {}
