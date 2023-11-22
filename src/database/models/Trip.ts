import mongoose, { Schema, Document } from "mongoose";
import UserModel, { IUser } from "./User";

export interface ITrip {
    _id: string;
    organizer_id: mongoose.Types.ObjectId;
    organizer: IUser;
    tripName: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface ITripDocument extends Omit<ITrip, "_id" | "organizer" | "createdAt" | "updatedAt">, Document {}

const TripSchema = new Schema<ITripDocument>(
    {
        organizer_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: UserModel,
        },
        tripName: {
            type: String,
            required: true,
        },
        description: String,
        /* isPrivate: {
            type: Boolean,
            default: true,
        }, */
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
