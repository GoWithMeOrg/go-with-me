import mongoose from "mongoose";

export interface ICompanions {
    user_id: mongoose.Types.ObjectId;
    companions: mongoose.Types.ObjectId[];
    updatedAt?: Date;
}
