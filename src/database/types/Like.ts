import mongoose from "mongoose";

export interface Like {
    event_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
}
