import mongoose, { Schema, Document } from "mongoose";
import UserModel, { IUser } from "./User";
export interface IEvent {
    _id: string;
    organizer_id: mongoose.Types.ObjectId | string;
    organizer: IUser;
    name: string;
    description: string;
    /* isPrivate: boolean; */
    startDate?: Date | string;
    endDate?: Date | string;
    time?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    location: {
        type: string;
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    tags?: string[];
    category?: string;
    status?: string;
}

export interface IEventDocument extends Omit<IEvent, "_id" | "organizer" | "createdAt" | "updatedAt">, Document {}

const EventSchema = new Schema<IEventDocument>(
    {
        organizer_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: UserModel,
        },
        name: {
            type: String,
            required: true,
        },
        description: String,
        /* isPrivate: {
            type: Boolean,
            default: true,
        }, */

        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
            properties: {
                address: String,
            },
        },
        category: {
            type: String,
            required: true,
            enum: ["Party", "Conference", "Concert", "Trip", "Workshops"],
        },
        status: {
            type: String,
            required: true,
            enum: ["Public", "Invation", "Private"],
        },

        startDate: Date,
        endDate: Date,
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
