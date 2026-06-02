import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class ToggleJoinInput {
    @Field(() => ID)
    user: Types.ObjectId;

    @Field(() => ID)
    ownerId: Types.ObjectId;

    @Field(() => String)
    ownerType: 'Event' | 'Trip';
}
