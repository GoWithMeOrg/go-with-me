import mongoose, { Schema, Document } from "mongoose";
import UserModel from "./User";
import type { IUser } from "./User";

export interface IComment {
    _id: string;
    author_id: mongoose.Types.ObjectId;
    author: IUser;
    event_id: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
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