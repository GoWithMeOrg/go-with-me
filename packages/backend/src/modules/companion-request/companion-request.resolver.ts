import { Resolver, Mutation, Args, ID, Subscription, Query } from '@nestjs/graphql';
import { CompanionRequestService } from '@/modules/companion-request/companion-request.service.js';
import { CompanionRequest } from '@/modules/companion-request/entities/companion-request.entity.js';
import { UseGuards, Inject } from '@nestjs/common';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard.js';
import { RolesGuard } from '@/common/guards/roles.guard.js';
import { Types } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '@/common/constants/pub-sub.constants.js';
import { GqlAuthGuard } from '@/common/guards/gql-auth.guard.js';
import { CurrentUser } from '@/common/decorators/current-user.decorator.js';
import { User } from '@/modules/user/entities/user.entity.js';

@Resolver(() => CompanionRequest)
export class CompanionRequestResolver {
    constructor(
        private readonly companionRequestService: CompanionRequestService,
        @Inject(PUB_SUB) private pubSub: PubSub
    ) {}

    @Query(() => [CompanionRequest])
    @UseGuards(SessionAuthGuard, RolesGuard)
    async getCompanionRequests(
        @Args('user_id', { type: () => ID }) user_id: Types.ObjectId
    ): Promise<CompanionRequest[]> {
        return this.companionRequestService.getCompanionRequests(user_id);
    }

    @Mutation(() => CompanionRequest)
    @UseGuards(GqlAuthGuard, RolesGuard)
    async sendRequestCompanion(
        @CurrentUser() user: User,
        @Args('receiver', { type: () => ID }) receiver: Types.ObjectId
    ) {
        const request = await this.companionRequestService.sendRequestCompanion(user._id, receiver);

        await this.pubSub.publish('sendRequestCompanion', {
            sendRequestCompanion: request,
            currentUserId: receiver.toString(),
        });

        return request;
    }

    @Subscription(() => CompanionRequest, {
        name: 'sendRequestCompanion',
        // filter по payload вместо context
        filter: (payload) => {
            const request = payload.sendRequestCompanion;
            const receiverId =
                request.receiver?._id?.toString?.() || request.receiver?.toString?.();

            // проверяем, что событие предназначено для пользователя
            return receiverId === payload.currentUserId;
        },
    })
    sendRequestCompanionSubscription() {
        return this.pubSub.asyncIterableIterator('sendRequestCompanion');
    }

    @Mutation(() => CompanionRequest)
    @UseGuards(SessionAuthGuard, RolesGuard)
    async acceptCompanionRequest(
        @CurrentUser() user: User,
        @Args('request_id', { type: () => ID }) request_id: Types.ObjectId
    ): Promise<CompanionRequest | null> {
        return this.companionRequestService.acceptCompanionRequest(request_id);
    }

    // Отклонить заявку в компаньоны
    @Mutation(() => CompanionRequest)
    @UseGuards(SessionAuthGuard, RolesGuard)
    async rejectCompanionRequest(
        @CurrentUser() user: User,
        @Args('request_id', { type: () => ID }) request_id: Types.ObjectId
    ): Promise<CompanionRequest | null> {
        return this.companionRequestService.rejectCompanionRequest(request_id);
    }
}
