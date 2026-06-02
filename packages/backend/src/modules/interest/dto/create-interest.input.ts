import { Field, InputType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateInterestInput {
    @Field(() => [String])
    interests: string[];

    @Field(() => ID, { nullable: true })
    ownerId: Types.ObjectId;

    @Field(() => String, { nullable: true })
    ownerType: 'User' | 'Event';
}
