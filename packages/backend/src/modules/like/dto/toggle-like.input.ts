import { InputType, Field, ID } from '@nestjs/graphql';
import {  Types } from 'mongoose';

@InputType()
export class ToggleLikeInput {
    @Field(() => ID)
    user: Types.ObjectId;

    @Field(() => ID)
    ownerId: Types.ObjectId;

    @Field(() => String)
    ownerType: 'Event' | 'Comment' | 'Trip';
}
