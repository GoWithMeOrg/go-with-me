import { Field, InputType, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class CreateTagInput {
    @Field(() => [String], { nullable: true })
    tags: string[];

    @Field(() => ID, { nullable: true })
    ownerId: MongoSchema.Types.ObjectId;

    @Field(() => String, { nullable: true })
    ownerType: 'User' | 'Event';
}
