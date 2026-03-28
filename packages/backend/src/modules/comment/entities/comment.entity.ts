import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OwnerType } from 'src/common/enums/owner-type.enum';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Comment {
    @Field(() => ID)
    _id: MongoSchema.Types.ObjectId;

    @Field(() => User)
    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
    author: User;

    @Field(() => String)
    @Prop({ type: String, required: true })
    content: string;

    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String)
    @Prop({ type: String, enum: OwnerType, required: true })
    ownerType: OwnerType;

    @Field(() => Comment, { nullable: true })
    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Comment', default: null })
    parent?: Comment;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ ownerId: 1, ownerType: 1 });
CommentSchema.index({ parentId: 1 });
