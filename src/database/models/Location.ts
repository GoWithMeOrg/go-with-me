import mongoose, { Schema, Document } from "mongoose";
import UserModel, { IUser } from "./User";

export interface ILocation {
    _id: string;
    author_id: mongoose.Types.ObjectId;
    author: IUser;
    trip_id: mongoose.Types.ObjectId;
    content: string;
    name: string;
    address: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    description?: string;
}

export interface ILocationDocument extends Omit<ILocation, "_id" | "createdAt" | "updatedAt">, Document {}

export type LocationsRequestField =
    | Pick<ILocation, "address">
    | Pick<ILocation, "author">
    | Pick<ILocation, "coordinates">
    | Pick<ILocation, "name">;

const LocationSchema = new Schema<ILocationDocument>({
    name: {
        type: String,
        required: true,
    },
    author_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
    },
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
});

const LocationModel: mongoose.Model<ILocationDocument> =
    mongoose.models.Location || mongoose.model<ILocationDocument>("Location", LocationSchema);

export default LocationModel;
