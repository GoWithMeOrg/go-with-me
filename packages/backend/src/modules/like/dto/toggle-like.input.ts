import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class ToggleLikeInput {
    @Field(() => ID)
    user: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String)
    ownerType: 'Event' | 'Comment' | 'Trip';
}
