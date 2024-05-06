import mongoose, { Schema, Document } from "mongoose";
import UserModel, { IUser } from "./User";

enum EventStatus {
    PUBLIC = "public",
    INVATION = "invation",
    PRIVATE = "private",
}
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
        type: string;
        coordinates: [number, number];
        properties: {
            address: string;
        };
    };
    tags?: string[];
    categories?: string[];
    status: string;
    image?: string;
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

        startDate: Date,
        endDate: Date,
        time: String,

        categories: {
            type: [String],
            required: true,
            /* enum: [
                "Music & Concerts",
                "Sport & Fitness",
                "Arts & Theatre",
                "Conferences & Workshops",
                "Food & Drink",
                "Networking & Social",
                "Technology & Innovation",
                "Family & Education",
                "Health & Wellnes",
                "Charity & Causes",
                "Parties & Nightlife",
                "Travel & Outdoor",
                "Cultural & Religious",
                "Fashion & Beauty",
                "Hobbies & Special interest",
            ], */
        },

        status: {
            type: String,
            enum: ["public", "invation", "private"],
            required: true,
        },

        image: {
            type: String,
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
