import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CurrentUser } from '@/common/decorators/current-user.decorator.js';
import { Join } from '@/modules/join/entities/join.entity.js';
import { JoinService } from '@/modules/join/join.service.js';
import { User } from '@/modules/user/entities/user.entity.js';

@Resolver(() => Join)
export class JoinResolver {
    constructor(private readonly joinService: JoinService) {}

    @Mutation(() => Boolean)
    async toggleJoin(
        @CurrentUser() user: User,
        @Args('ownerId', { type: () => ID }) ownerId: Types.ObjectId,
        @Args('ownerType') ownerType: 'Event' | 'Trip'
    ): Promise<boolean> {
        return this.joinService.toggleJoin(user._id, ownerId, ownerType);
    }

    @Query(() => [Join])
    async getJoinedUsersByOwnerId(@Args('ownerId', { type: () => ID }) ownerId: Types.ObjectId) {
        return this.joinService.getJoinedUsersByOwnerId(ownerId);
    }

    @Query(() => Boolean, { nullable: true })
    async isJoinedByUser(
        @CurrentUser() user: User,
        @Args('owner_id', { type: () => ID }) owner_id: Types.ObjectId
    ) {
        return this.joinService.isJoinedByUser(owner_id, user._id);
    }
}
