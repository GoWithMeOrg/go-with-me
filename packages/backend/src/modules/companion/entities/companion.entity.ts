import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Companion {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => [ID])
    @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'User' }] })
    companions: MongoSchema.Types.ObjectId[];

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['User'], required: true })
    ownerType: 'User';
}

export type CompanionDocument = Companion & Document;
export const CompanionSchema = SchemaFactory.createForClass(Companion);
