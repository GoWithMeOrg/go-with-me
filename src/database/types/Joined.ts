import mongoose from "mongoose";

export interface IJoined {
    event_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    joined: boolean;
    createdAt: Date;
    updatedAt: Date;
}
