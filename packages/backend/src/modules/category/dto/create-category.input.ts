import { InputType, Field, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

@InputType()
export class CreateCategoryInput {
    @Field(() => [String])
    categories: string[];

    @Field(() => ID, { nullable: true })
    ownerId?: MongoSchema.Types.ObjectId;

    @Field(() => String, { nullable: true })
    ownerType?: 'User' | 'Event';
}
