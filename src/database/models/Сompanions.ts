import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICompanionsDocument extends Document {
    user_id: Types.ObjectId;
    companions: Types.ObjectId[];
    updatedAt?: Date;
}

const CompanionsSchema = new Schema<ICompanionsDocument>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: "User",
        },
        companions: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: { updatedAt: true, createdAt: false },
    },
);

// Индекс для ускорения поиска по user_id и обеспечения уникальности
CompanionsSchema.index({ user_id: 1 }, { unique: true });

const CompanionsModel = mongoose.model<ICompanionsDocument>("Companions", CompanionsSchema);

export default CompanionsModel;
