import mongoose, { Schema, Document } from "mongoose";
import UserModel from "./User";
import type { IUser } from "./User";

// TODO: split to types:
// - INewComment (without _id, author, createdAt and updatedAt)
// - IComment (with _id, author, createdAt and updatedAt)
// think about createdAt and updatedAt
export interface IComment {
    _id: string;
    author: IUser;
    event_id: mongoose.Types.ObjectId;
    content: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
    replies_id: mongoose.Types.ObjectId[];
    replies: IComment[];
    replyToId: string | null;
}

export interface ICommentDocument extends Omit<IComment, "_id" | "createdAt" | "updatedAt">, Document {}

const CommentSchema = new Schema<ICommentDocument>(
    {
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
        replies_id: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        replyToId: [
            {
                type: String,
                required: false,
            },
        ],
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

const CommentModel: mongoose.Model<ICommentDocument> =
    mongoose.models.Comment || mongoose.model<ICommentDocument>("Comment", CommentSchema);

export default CommentModel;
