import mongoose, { Schema, Document } from "mongoose";

import UserModel from "./User";
import type { IUser } from "@/database/types/User";

export interface INewComment {
    author_id: mongoose.Types.ObjectId;
    event_id: mongoose.Types.ObjectId;
    content: string;
    replyTo?: {
        id: mongoose.Types.ObjectId;
        userName: string;
    };
    parentId?: mongoose.Types.ObjectId;
}

export interface IComment extends INewComment {
    _id: mongoose.Types.ObjectId;
    author: IUser;
    createdAt: Date;
    updatedAt: Date;
    likes: string[];
    replies: IComment[];
    replyToList: mongoose.Types.ObjectId[];
}

export interface ICommentDocument extends Omit<IComment, "_id" | "createdAt" | "updatedAt">, Document {}

const CommentSchema = new Schema<ICommentDocument>(
    {
        author_id: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
            required: true,
        },
        event_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: { type: [String], required: true, default: [] },
        parentId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
        replyTo: {
            type: {
                id: { type: Schema.Types.ObjectId, required: true },
                userName: { type: String, required: true },
            },
            required: false,
        },
        replyToList: { type: [Schema.Types.ObjectId], required: true, default: [] },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

CommentSchema.virtual("author", {
    ref: UserModel,
    localField: "author_id",
    foreignField: "_id",
    justOne: true,
});

CommentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId",
    justOne: false,
});

const CommentModel: mongoose.Model<ICommentDocument> =
    mongoose.models.Comment || mongoose.model<ICommentDocument>("Comment", CommentSchema);

export default CommentModel;
