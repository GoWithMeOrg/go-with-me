import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { JoinService } from './join.service';
import { Join } from './entities/join.entity';
import { Schema as MongoSchema } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Resolver(() => Join)
export class JoinResolver {
    constructor(private readonly joinService: JoinService) {}

    @Mutation(() => Boolean)
    async toggleJoin(
        @CurrentUser() user: User,
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId,
        @Args('ownerType') ownerType: 'Event' | 'Trip'
    ): Promise<boolean> {
        return this.joinService.toggleJoin(user._id, ownerId, ownerType);
    }

    @Query(() => [Join])
    async getJoinedByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId
    ) {
        return this.joinService.getJoinedByOwnerId(ownerId);
    }

    @Query(() => Boolean, { nullable: true })
    async isJoinedByUser(
        @CurrentUser() user: User,
        @Args('owner_id', { type: () => ID }) owner_id: MongoSchema.Types.ObjectId
    ) {
        return this.joinService.isJoinedByUser(owner_id, user._id);
    }
}
