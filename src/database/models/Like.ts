import mongoose, { Schema, Document } from "mongoose";
import { Like } from "../types/Like";
import UserModel from "./User";
import EventModel from "./Event";

export interface ILikeDocument extends Like, Document {}

const LikeSchema = new Schema<ILikeDocument>(
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

        isLiked: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

LikeSchema.virtual("event", {
    ref: EventModel,
    localField: "event_id",
    foreignField: "_id",
    justOne: true,
});

LikeSchema.virtual("user", {
    ref: UserModel,
    localField: "user_id",
    foreignField: "_id",
    justOne: true,
});

const LikeModel: mongoose.Model<ILikeDocument> =
    mongoose.models.Like || mongoose.model<ILikeDocument>("Like", LikeSchema);

export default LikeModel;
