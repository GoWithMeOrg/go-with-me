import { Field, InputType, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class CreateInterestInput {
    @Field(() => [String])
    interests: string[];

    @Field(() => ID, { nullable: true })
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String, { nullable: true })
    ownerType: 'User' | 'Event';
}
