import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface ILocation {
    _id: string;
    author_id: mongoose.Types.ObjectId;
    author: IUser;
    trip_id: mongoose.Types.ObjectId;
    content: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    description?: string;
}

export type LocationInput = Pick<ILocation, "author_id" | "name" | "address" | "latitude" | "longitude">;

export interface ILocationDocument extends Omit<ILocation, "_id" | "createdAt" | "updatedAt">, Document {}

export const LocationSchema = new Schema({
    author_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

const LocationModel: mongoose.Model<ILocationDocument> =
    mongoose.models.Location || mongoose.model<ILocationDocument>("Location", LocationSchema);

export default LocationModel;
