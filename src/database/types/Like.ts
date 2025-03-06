import mongoose from "mongoose";

export interface ILike {
    event_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    like: boolean;
    createdAt: Date;
    updatedAt: Date;
}
