import mongoose, { Schema, Document } from "mongoose";
import UserModel from "./User";
import type { IUser } from "./User";

// TODO: split to types:
// - INewComment (without _id, author, createdAt and updatedAt)
// - IComment (with _id, author, createdAt and updatedAt)
// think about createdAt and updatedAt

export interface INewComment {
    author_id: mongoose.Types.ObjectId;
    event_id: mongoose.Types.ObjectId;
    content: string;
    replyToId: mongoose.Types.ObjectId | null;
    parentId: mongoose.Types.ObjectId | null;
}

export interface IComment extends INewComment {
    _id: mongoose.Types.ObjectId;
    author: IUser;
    createdAt: string;
    updatedAt: string;
    likes: number;
    replies: IComment[];
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
        likes: {
            type: Number,
            default: 0,
        },
        parentId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
        replyToId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
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
