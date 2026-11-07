import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RespondInvitationInput {
    @Field(() => ID)
    invitationId: string;

    @Field(() => ID)
    userId: string;
}
