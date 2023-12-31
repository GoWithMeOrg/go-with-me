import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserDocument extends Omit<IUser, "_id" | "createdAt" | "updatedAt">, Document {}

const UserSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    image: String,
    emailVerified: {
        type: Boolean,
        default: false,
    },
});

const UserModel: mongoose.Model<IUserDocument> =
    mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
