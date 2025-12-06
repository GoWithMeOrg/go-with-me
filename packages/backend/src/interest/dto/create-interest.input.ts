import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateInterestInput {
    @Field(() => [String])
    interests: string[];

    @Field(() => ID)
    ownerId: string;

    @Field(() => String)
    ownerType: 'User' | 'Event';
}
