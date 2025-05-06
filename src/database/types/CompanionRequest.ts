import mongoose from "mongoose";

export interface ICompanionRequest {
    id: string;
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    status: "pending" | "accepted" | "rejected" | "blocked";
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICompanionRequestDocument extends ICompanionRequest, Document {}
