import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { JoinService } from './join.service.js';
import { Join } from './entities/join.entity.js';
import { Types } from 'mongoose';
import { CurrentUser } from '@/common/decorators/current-user.decorator.js';
import { User } from '../user/entities/user.entity.js';

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
    async getJoinedUsersByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: Types.ObjectId
    ) {
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
