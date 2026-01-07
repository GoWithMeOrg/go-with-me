import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Permission {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ required: true, unique: true })
    permission: string;

    @Field(() => String)
    @Prop({ required: true, enum: ['read', 'write', 'delete'] })
    action: string;

    @Field(() => String)
    @Prop({ required: true })
    resource: string;

    @Field(() => String)
    @Prop({ default: '' })
    description: string;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
