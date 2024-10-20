import mongoose, { Schema, Document } from "mongoose";
import Role from "./Role";
import { IUser } from "@/database/types/User";

export interface IUserDocument extends Omit<IUser, "_id" | "createdAt" | "updatedAt">, Document {}

const UserSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    role: {
        type: Schema.Types.ObjectId,
        ref: Role,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    image: String,
    location: String,
    aboutMe: String,

    interests: {
        type: [String],
        required: true,
    },

    meetings: {
        type: [String],
        required: true,
    },

    tags: {
        type: [String],
        required: true,
    },

    emailVerified: {
        type: Boolean,
        default: false,
    },
});

const UserModel: mongoose.Model<IUserDocument> =
    mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
