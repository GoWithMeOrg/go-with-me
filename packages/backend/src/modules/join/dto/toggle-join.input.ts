import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class ToggleJoinInput {
    @Field(() => ID)
    user: MongoSchema.Types.ObjectId;

    @Field(() => ID)
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String)
    ownerType: 'Event' | 'Trip';
}
