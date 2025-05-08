import mongoose, { Schema, Model } from "mongoose";
import { ICompanionRequestDocument, CompanionRequestStatus } from "../types/CompanionRequest";

const CompanionRequestSchema = new Schema<ICompanionRequestDocument>({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    status: {
        type: String,
        enum: CompanionRequestStatus,
        default: CompanionRequestStatus.PENDING,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

CompanionRequestSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const CompanionRequestModel: Model<ICompanionRequestDocument> =
    mongoose.models?.CompanionRequest ||
    mongoose.model<ICompanionRequestDocument>("CompanionRequest", CompanionRequestSchema);

export default CompanionRequestModel;
