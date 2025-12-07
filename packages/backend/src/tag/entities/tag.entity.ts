import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Tag {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => [String])
    @Prop({ type: [String] })
    tags: string[];

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: string;

    @Field(() => String)
    @Prop({ type: String, enum: ['User', 'Event'], required: true })
    ownerType: 'User' | 'Event';
}

export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
