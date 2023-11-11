import mongoose, { Schema, Document } from "mongoose";
import UserModel from "./User";

/**
 * TODO:
 * location: Array of Embedded Documents (see below for structure)
 * bannerImage: String (URL or base64 encoded data)
 */

export interface IEvent extends Document {
    organizer_id: mongoose.Types.ObjectId;
    tripName: string;
    description: string;
    isPrivate: boolean;
    startDate: Date;
    endDate: Date;
}

const EventSchema = new Schema<IEvent>(
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
    },
    {
        timestamps: true,
    },
);

EventSchema.virtual("organizer", {
    ref: UserModel,
    localField: "organizer_id",
    foreignField: "_id",
    justOne: true,
});

const EventModel: mongoose.Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default EventModel;
