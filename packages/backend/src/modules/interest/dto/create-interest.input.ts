import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateInterestInput {
    @Field(() => [String])
    interests: string[];

    @Field(() => ID, { nullable: true })
    ownerId: string;

    @Field(() => String, { nullable: true })
    ownerType: 'User' | 'Event';
}
