import mongoose, { Schema, Document } from "mongoose";

export interface ILocation {
    // _id: string;
    // author_id: mongoose.Types.ObjectId;
    // author: IUser;
    // trip_id: mongoose.Types.ObjectId;
    // content: string;
    name: string;
    // address: string;
    // coordinates: {
    //     latitude: number;
    //     longitude: number;
    // };
    // description?: string;
}

export interface ILocationDocument extends Omit<ILocation, "_id" | "createdAt" | "updatedAt">, Document {}

const LocationSchema = new Schema<ILocationDocument>({
    name: {
        type: String,
        required: true,
    },
});

const LocationModel: mongoose.Model<ILocationDocument> =
    mongoose.models.Location || mongoose.model<ILocationDocument>("Location", LocationSchema);

export default LocationModel;
