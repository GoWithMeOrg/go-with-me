import { Resolver, Mutation, Args, ID, Query } from '@nestjs/graphql';
import { InvitationService } from './invitation.service.js';
import { Invitation } from './entities/invitation.entity.js';
import { SendInvitationInput } from './dto/send-invitation.input.js';
import { Types } from 'mongoose';
import { Event } from '@/modules/event/entities/event.entity.js';

@Resolver()
export class InvitationResolver {
    constructor(private readonly invitationService: InvitationService) {}

    @Query(() => [Invitation])
    async getInvitation(
        @Args('user_id', { type: () => ID }) userId: Types.ObjectId,
    ): Promise<Invitation[]> {
        return this.invitationService.getInvitation(userId);
    }

    @Query(() => [Event])
    async companionInvitationEvent(
        @Args('organizer_id', { type: () => ID }) organizerId: Types.ObjectId,
		@Args('companion_id', { type: () => ID }) companionId: Types.ObjectId,
    ): Promise<Event[]> {
        return this.invitationService.getCompanionInvitationEvent(new Types.ObjectId(organizerId), companionId);
    }

    @Query(() => [Event])
    async getDeclinedEvents(
        @Args('userId', { type: () => ID }) userId: Types.ObjectId,
    ): Promise<Event[]> {
        return this.invitationService.getDeclinedEvents(userId);
    }

    @Mutation(() => Invitation)
    async sendInvitation(
        @Args('input') input: SendInvitationInput,
    ): Promise<Invitation> {
        return this.invitationService.sendInvitation(input);
    }

    @Mutation(() => Invitation)
    async acceptInvitation(
        @Args('invitationId', { type: () => ID }) invitationId: Types.ObjectId,
        @Args('userId', { type: () => ID }) userId: Types.ObjectId,
    ): Promise<Invitation> {
        return this.invitationService.acceptInvitation(invitationId, userId);
    }

    @Mutation(() => Invitation)
    async declineInvitation(
        @Args('invitationId', { type: () => ID }) invitationId: Types.ObjectId,
        @Args('userId', { type: () => ID }) userId: Types.ObjectId,
    ): Promise<Invitation> {
        return this.invitationService.declineInvitation(invitationId, userId);
    }
}
