import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
    @Field(() => [String])
    categories: string[];

    @Field(() => ID, { nullable: true })
    ownerId?: string;

    @Field(() => String, { nullable: true })
    ownerType?: 'User' | 'Event';
}
