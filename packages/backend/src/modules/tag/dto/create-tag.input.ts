import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
    @Field(() => [String], { nullable: true })
    tags: string[];

    @Field(() => ID, { nullable: true })
    ownerId: string;

    @Field(() => String, { nullable: true })
    ownerType: 'User' | 'Event';
}
