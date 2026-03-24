import { InputType, Field, ID } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class CreateLikeInput {
    @Field(() => ID)
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    user: MongoSchema.Types.ObjectId;

    @Field(() => ID, { nullable: true })
    @Prop({ type: MongoSchema.Types.ObjectId, required: true })
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String, { nullable: true })
    @Prop({ type: String, enum: ['Event', 'Comment', 'Trip'], required: true })
    ownerType: 'Event' | 'Comment' | 'Trip';
}
