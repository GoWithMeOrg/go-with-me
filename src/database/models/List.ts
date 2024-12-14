import mongoose, { Schema, Document } from "mongoose";

import UserModel from "./User";

export interface IList {
    _id?: string;
    author_id: mongoose.Types.ObjectId | string;
    name: string;
    description: string;
    users_id: mongoose.Types.ObjectId[];
}

const ListSchema = new Schema<IList>(
    {
        author_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: UserModel,
        },
        name: {
            type: String,
            required: true,
        },
        description: String,
        users_id: {
            type: [Schema.Types.ObjectId],
            ref: UserModel,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

ListSchema.virtual("author", {
    ref: UserModel,
    localField: "author_id",
    foreignField: "_id",
    justOne: true,
});

const ListModel: mongoose.Model<IList> = mongoose.models.List || mongoose.model<IList>("List", ListSchema);

export default ListModel;
