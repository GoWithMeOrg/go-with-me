import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
    @Field(() => [String])
    categories: string[];

    @Field(() => ID)
    ownerId: string;

    @Field(() => String)
    ownerType: 'User' | 'Event';
}
