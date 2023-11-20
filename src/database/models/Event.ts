import mongoose, { Schema, Document } from "mongoose";
import UserModel, { IUser } from "./User";

/**
 * TODO:
 * location: Array of Embedded Documents (see below for structure)
 * bannerImage: String (URL or base64 encoded data)
 */

export interface IEvent {
    _id: string;
    organizer_id: mongoose.Types.ObjectId;
    organizer: IUser; // virtual
    tripName: string;
    description: string;
    isPrivate: boolean;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date | string;
    updatedAt: Date | string;
    location?: {
        lat: number;
        lng: number; // 47.14758598529329, 8.509962121063706 Zug, Switzerland
    };
}

export interface IEventDocument extends Omit<IEvent, "_id" | "organizer" | "createdAt" | "updatedAt">, Document {}

const EventSchema = new Schema<IEventDocument>(
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
        isPrivate: {
            type: Boolean,
            default: true,
        },
        startDate: Date,
        endDate: Date,
        location: {
            lat: { type: Number, required: true, default: 47.14758598529329 },
            lng: { type: Number, required: true, default: 8.509962121063706 },
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

EventSchema.virtual("organizer", {
    ref: UserModel,
    localField: "organizer_id",
    foreignField: "_id",
    justOne: true,
});

const EventModel: mongoose.Model<IEventDocument> =
    mongoose.models.Event || mongoose.model<IEventDocument>("Event", EventSchema);

export default EventModel;
