import mongoose, { Schema, Document } from "mongoose";

export interface ILocation {
    name: string;
    address: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    description?: string;
}

export interface ILocationDocument extends Omit<ILocation, "_id" | "createdAt" | "updatedAt">, Document {}

const LocationSchema = new Schema<ILocationDocument>({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        unique: true,
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
    description: String,
});

const LocationModel: mongoose.Model<ILocationDocument> =
    mongoose.models.Location || mongoose.model<ILocationDocument>("Location", LocationSchema);

export default LocationModel;
