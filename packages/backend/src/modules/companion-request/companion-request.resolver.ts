import { Resolver, Mutation, Args, ID, Subscription, Query } from '@nestjs/graphql';
import { CompanionRequestService } from './companion-request.service';
import { CompanionRequest } from './entities/companion-request.entity';
import { UseGuards, Inject } from '@nestjs/common';
import { SessionAuthGuard } from 'src/common/guards/session-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Schema as MongoSchema } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/constants/pub-sub.constants';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Resolver(() => CompanionRequest)
export class CompanionRequestResolver {
    constructor(
        private readonly companionRequestService: CompanionRequestService,
        @Inject(PUB_SUB) private pubSub: PubSub
    ) {}

    @Query(() => [CompanionRequest])
    @UseGuards(SessionAuthGuard, RolesGuard)
    async getCompanionRequests(
        @Args('user_id', { type: () => ID }) user_id: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequest[]> {
        return this.companionRequestService.getCompanionRequests(user_id);
    }

    //Удалить после тестирования и раскоментировать код выше
    @Mutation(() => CompanionRequest)
    @UseGuards(GqlAuthGuard, RolesGuard)
    async sendRequestCompanion(
        @CurrentUser() user: User,
        @Args('receiver', { type: () => ID }) receiver: MongoSchema.Types.ObjectId,
        // временно для тестов. Нужно будет удалить строку с отправителем.
        @Args('sender', { type: () => ID }) sender: MongoSchema.Types.ObjectId
    ) {
        // Используем senderId, если передан, иначе текущий пользователь
        const request = await this.companionRequestService.sendRequestCompanion(sender, receiver);

        await this.pubSub.publish('sendRequestCompanion', {
            sendRequestCompanion: request,
            currentUserId: user._id.toString(), // событие для получателя
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
        @Args('request_id', { type: () => ID }) request_id: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequest | null> {
        return this.companionRequestService.acceptCompanionRequest(request_id);
    }

    // Отклонить заявку в компаньоны
    @Mutation(() => CompanionRequest)
    @UseGuards(SessionAuthGuard, RolesGuard)
    async rejectCompanionRequest(
        @CurrentUser() user: User,
        @Args('request_id', { type: () => ID }) request_id: MongoSchema.Types.ObjectId
    ): Promise<CompanionRequest | null> {
        return this.companionRequestService.rejectCompanionRequest(request_id);
    }
}
