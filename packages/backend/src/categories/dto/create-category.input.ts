import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateCategoriesInput {
    @Field(() => [String])
    categories: string[];

    @Field(() => ID)
    ownerId: string;

    @Field(() => String)
    ownerType: 'User' | 'Event';
}
