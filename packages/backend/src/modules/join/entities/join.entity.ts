import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Join {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    user: Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['Event', 'Trip'], required: true })
    ownerType: 'Event' | 'Trip';
}

export type JoinDocument = Join & Document;
export const JoinSchema = SchemaFactory.createForClass(Join);

JoinSchema.index({ ownerId: 1, ownerType: 1 });
