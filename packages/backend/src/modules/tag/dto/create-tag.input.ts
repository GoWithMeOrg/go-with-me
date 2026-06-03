import { Field, InputType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateTagInput {
    @Field(() => [String], { nullable: true })
    tags: string[];

    @Field(() => ID, { nullable: true })
    ownerId: Types.ObjectId;

    @Field(() => String, { nullable: true })
    ownerType: 'User' | 'Event';
}
