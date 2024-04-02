import mongoose, { Schema, Document } from "mongoose";
import UserModel, { IUser } from "./User";
import { IEvent } from "./Event";

export interface ITrip {
    _id: string;
    organizer_id: mongoose.Types.ObjectId | string;
    organizer: IUser;
    name: string;
    description: string;
    isPrivate: boolean;
    startDate?: Date | string;
    endDate?: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
    events: IEvent[];
    events_id: mongoose.Types.ObjectId[];
}

export interface ITripDocument extends Omit<ITrip, "_id" | "organizer" | "createdAt" | "updatedAt">, Document {}

const TripSchema = new Schema<ITripDocument>(
    {
        organizer_id: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: UserModel,
        },
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

TripSchema.virtual("organizer", {
    ref: UserModel,
    localField: "organizer_id",
    foreignField: "_id",
    justOne: true,
});

const TripModel: mongoose.Model<ITripDocument> =
    mongoose.models.Trip || mongoose.model<ITripDocument>("Trip", TripSchema);

export default TripModel;
