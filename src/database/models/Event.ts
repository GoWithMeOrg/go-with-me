import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/database/types/User";
import UserModel from "./User";

export interface IEvent {
    _id: string;
    organizer_id: mongoose.Types.ObjectId | string;
    organizer: IUser;
    name: string;
    description: string;
    startDate?: Date | string;
    endDate?: Date | string;
    time?: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    location: {
        type: "Point";
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    status: string;
    categories?: string[];
    types?: string[];
    tags?: string[];
    image?: string;
    joined: mongoose.Types.ObjectId[];
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

        location: {
            type: {
                type: String,
                enum: ["Point", "Polygon", "LineString"],
                required: true,
                default: "Point",
            },
            coordinates: {
                type: [Number],
                //required: true,
            },
            properties: {
                address: String,
            },
        },

        startDate: Date,
        endDate: Date,
        time: String,

        status: {
            type: String,
            enum: ["public", "private"],
            required: true,
        },

        categories: {
            type: [String],
            required: true,
        },

        types: {
            type: [String],
            required: true,
        },

        tags: {
            type: [String],
            required: true,
        },

        image: {
            type: String,
        },

        joined: [
            {
                type: Schema.Types.ObjectId,
                ref: UserModel,
            },
        ],
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
    mongoose.models?.Event || mongoose.model<IEventDocument>("Event", EventSchema);

export default EventModel;
