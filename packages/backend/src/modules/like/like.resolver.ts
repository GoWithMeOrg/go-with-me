import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { Schema as MongoSchema } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Resolver(() => Like)
export class LikeResolver {
    constructor(private readonly likeService: LikeService) {}

    @Mutation(() => Boolean)
    async toggleLike(
        @CurrentUser() user: User,
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId,
        @Args('ownerType') ownerType: 'Event' | 'Comment' | 'Trip'
    ): Promise<boolean> {
        return this.likeService.toggleLike(user._id, ownerId, ownerType);
    }

    @Query(() => [Like])
    async getLikesByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId
    ) {
        return this.likeService.getLikeByOwnerId(ownerId);
    }

    @Query(() => Boolean, { nullable: true })
    async isLikedByUser(
        @CurrentUser() user: User,
        @Args('owner_id', { type: () => ID }) owner_id: MongoSchema.Types.ObjectId
    ) {
        return this.likeService.isLikedByUser(owner_id, user._id);
    }

    // @Mutation(() => Like, { nullable: true })
    // async deleteLike(@Args('like_id') like_id: MongoSchema.Types.ObjectId) {
    //     return this.likeService.deleteLike(like_id);
    // }
}
