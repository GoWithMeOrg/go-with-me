import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Join {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    user: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['Event', 'Trip'], required: true })
    ownerType: 'Event' | 'Trip';
}

export type JoinDocument = Join & Document;
export const JoinSchema = SchemaFactory.createForClass(Join);

JoinSchema.index({ ownerId: 1, ownerType: 1 });
