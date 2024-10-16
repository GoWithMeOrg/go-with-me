import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "../types/Role";
import Role from "./Role";
export interface IUser {
    _id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    location: string;
    aboutMe: string;
    interests: string[];
    meetings: string[];
    tags: string[];
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: IRole;
}

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
