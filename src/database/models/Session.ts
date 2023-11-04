import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
    sessionToken: string;
    userId: mongoose.Types.ObjectId;
    expires: Date;
}

/**
 * @see https://next-auth.js.org/adapters/mongodb
 */
const SessionSchema = new Schema<ISession>(
    {
        sessionToken: String,
        userId: Schema.Types.ObjectId,
        expires: Date,
    },
    {
        timestamps: true,
    },
);

const SessionModel: mongoose.Model<ISession> =
    mongoose.models?.Session || mongoose.model<ISession>("Session", SessionSchema);

export default SessionModel;
