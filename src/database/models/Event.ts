import mongoose, { Schema, Document } from "mongoose";

/**
 * TODO:
 * location: Array of Embedded Documents (see below for structure)
 * bannerImage: String (URL or base64 encoded data)
 */

export interface IEvent extends Document {
    organizerId: mongoose.Types.ObjectId;
    tripName: string;
    description: string;
    isPrivate: boolean;
    startDate: Date;
    endDate: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        organizerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        tripName: {
            type: String,
            required: true,
        },
        description: String,
        isPrivate: Boolean,
        startDate: Date,
        endDate: Date,
    },
    {
        timestamps: true,
    },
);

const EventModel: mongoose.Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default EventModel;
