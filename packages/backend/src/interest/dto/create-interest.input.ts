import { Field, Float, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateInterestInput {
    @Field(() => [String])
    interest: string[];

    @Field(() => ID)
    ownerId: string;

    @Field(() => String)
    ownerType: 'User' | 'Event';
}
