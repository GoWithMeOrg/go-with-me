import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SendInvitationInput {
    @Field(() => ID)
    eventId: string;

    @Field(() => ID)
    senderId: string;

    @Field(() => [ID])
    receiverIds: string[];
}
