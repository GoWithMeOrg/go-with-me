import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Companion {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => [ID])
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    companions: Types.ObjectId[];

    @Field(() => ID)
    @Prop({ type: Types.ObjectId, required: true })
    ownerId: Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['User'], required: true })
    ownerType: 'User';
}

export type CompanionDocument = Companion & Document;
export const CompanionSchema = SchemaFactory.createForClass(Companion);
