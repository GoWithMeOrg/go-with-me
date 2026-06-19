import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RespondInvitationInput {
    @Field(() => ID)
    invitationId: string;

    @Field(() => ID)
    userId: string;
}
