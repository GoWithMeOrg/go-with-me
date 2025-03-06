import mongoose, { Schema, Document } from "mongoose";
import { IJoined } from "../types/Joined";
import UserModel from "./User";
import EventModel from "./Event";

export interface IJoinedDocument extends IJoined, Document {}

const JoinedSchema = new Schema<IJoinedDocument>(
    {
        event_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: EventModel,
        },

        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: UserModel,
        },

        isJoined: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

JoinedSchema.virtual("event", {
    ref: EventModel,
    localField: "event_id",
    foreignField: "_id",
    justOne: true,
});

JoinedSchema.virtual("user", {
    ref: UserModel,
    localField: "user_id",
    foreignField: "_id",
    justOne: true,
});

const JoinedModel: mongoose.Model<IJoinedDocument> =
    mongoose.models.Joined || mongoose.model<IJoinedDocument>("Joined", JoinedSchema);

export default JoinedModel;
