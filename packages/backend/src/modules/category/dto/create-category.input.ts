import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CreateCategoryInput {
    @Field(() => [String])
    categories: string[];

    @Field(() => ID, { nullable: true })
    ownerId?: Types.ObjectId;

    @Field(() => String, { nullable: true })
    ownerType?: 'User' | 'Event';
}
