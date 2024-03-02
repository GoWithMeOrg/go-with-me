import mongoose, { Schema, Document } from "mongoose";
import UserModel, { IUser } from "./User";
import { IEvent } from "@/database/models/Event";

export interface ITrip {
    name: string;
    description?: string;
    isPrivate: boolean;
    organizer_id: mongoose.Types.ObjectId | string;
    events_id?: mongoose.Types.ObjectId[];
    startDate?: Date | string;
    endDate?: Date | string;
}

export interface ITripFromDB extends ITrip {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    organizer: IUser;
    events: IEvent[];
}

export interface ITripDocument extends ITrip, Document {}

const TripSchema = new Schema<ITripDocument>(
    {
        name: {
            required: true,
            type: String,
        },
        description: String,
        isPrivate: {
            required: true,
            type: Boolean,
            default: true,
        },
        organizer_id: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: UserModel,
        },
        events_id: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Event",
            },
        ],
        startDate: Date,
        endDate: Date,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

const TripModel: mongoose.Model<ITripDocument> =
    mongoose.models.Trip || mongoose.model<ITripDocument>("Trip", TripSchema);

export default TripModel;
