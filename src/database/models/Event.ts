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
    /* category?: string; */
    status: string;
    image?: Buffer;
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
        /* category: {
            type: String,
            required: true,
            enum: ["Party", "Conference", "Concert", "Trip", "Workshops"],
        }, */
        status: {
            type: String,
            enum: ["public", "invation", "private"],
            required: true,
        },

        // image: {
        //     type: Buffer, // Store image data as a Buffer
        //     validate: {
        //         validator: function (v: any) {
        //             return v && v instanceof Buffer; // Check for valid Buffer
        //         },
        //         message: "Image must be a Buffer",
        //     },
        // },
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
