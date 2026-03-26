import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Comment {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    author: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, required: true })
    content: string;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: ['Event', 'Trip'], required: true })
    ownerType: 'Event' | 'Trip';

    @Field(() => ID, { nullable: true })
    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Comment', default: null })
    parentId?: MongoSchema.Types.ObjectId;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ ownerId: 1, ownerType: 1 });
CommentSchema.index({ parentId: 1 });
