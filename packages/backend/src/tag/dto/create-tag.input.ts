import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
    @Field(() => [String], { nullable: true })
    tags: string[];

    @Field(() => ID)
    ownerId: string;

    @Field(() => String)
    ownerType: 'User' | 'Event';
}
