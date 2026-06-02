import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OwnerType } from '@/common/enums/owner-type.enum';

@ObjectType()
@Schema({ timestamps: true })
export class Comment {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field(() => ID)
    @Prop({ type: Types.ObjectId, required: true })
    author: Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, required: true })
    content: string;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: OwnerType, required: true })
    ownerType: OwnerType;

    @Field(() => Comment, { nullable: true })
    @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
    parent?: Types.ObjectId;

    @Field(() => Number)
    @Prop({ type: Number, default: 0 })
    repliesCount: number;

    @Field(() => Boolean)
    @Prop({ default: false })
    deleted: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ ownerId: 1, ownerType: 1, createdAt: 1 });
CommentSchema.index({ parent: 1 });
