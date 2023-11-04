import mongoose, { Schema, Document } from "mongoose";

export enum ActionType {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete",
}

export interface IAcl extends Document {
    userId: mongoose.Types.ObjectId;
    resourceId: mongoose.Types.ObjectId;
    actionTypes: ActionType[];
}

/**
 * @see https://next-auth.js.org/adapters/mongodb
 */
const AclSchema = new Schema<IAcl>(
    {
        userId: Schema.Types.ObjectId,
        resourceId: Schema.Types.ObjectId,
        actionTypes: [String],
    },
    {
        timestamps: true,
    },
);

const AclModel: mongoose.Model<IAcl> = mongoose.models?.Acl || mongoose.model<IAcl>("Acl", AclSchema);

export default AclModel;
