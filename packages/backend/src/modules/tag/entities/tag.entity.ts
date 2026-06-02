import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Tag {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => [String])
    @Prop({ type: [String] })
    tags: string[];

    @Field(() => ID, { nullable: true })
    @Prop({ type: MongoSchema.Types.ObjectId, required: false })
    ownerId: Types.ObjectId;

    @Field(() => String, { nullable: true })
    @Prop({ type: String, enum: ['User', 'Event'], required: false })
    ownerType: 'User' | 'Event';
}

export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
