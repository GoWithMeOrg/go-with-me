import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { Schema as MongoSchema } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Resolver(() => Like)
export class LikeResolver {
    constructor(private readonly likeService: LikeService) {}

    @Mutation(() => Like)
    createLike(@Args('user') user: MongoSchema.Types.ObjectId) {
        return this.likeService.createLike();
    }
}
