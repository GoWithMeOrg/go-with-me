import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Like {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    user: Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['Event', 'Comment', 'Trip'], required: true })
    ownerType: 'Event' | 'Comment' | 'Trip';
}

export type LikeDocument = Like & Document;
export const LikeSchema = SchemaFactory.createForClass(Like);

LikeSchema.index({ ownerId: 1, ownerType: 1 });
