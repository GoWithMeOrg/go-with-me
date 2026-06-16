import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CompanionService } from './companion.service';
import { Companion } from './entities/companion.entity';
import { UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { User } from '../user/entities/user.entity';
import { CompanionsResponse } from './entities/companions-response.entity';
import { SessionAuthGuard } from '@/common/guards/session-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@Resolver(() => Companion)
export class CompanionResolver {
    constructor(private readonly companionService: CompanionService) {}

    @Query(() => CompanionsResponse, {
        name: 'companionsByOwnerId',
        description: 'Поиск компаньонов по ownerId',
    })
    getCompanionsByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: Types.ObjectId,
        @Args('limit', { type: () => Int, nullable: true })
        limit?: number,
        @Args('offset', { type: () => Int, nullable: true })
        offset?: number
    ): Promise<{ companions: User[]; totalCompanions: number }> {
        return this.companionService.getCompanionsByOwner(ownerId, limit, offset);
    }

    @Query(() => [User], {
        name: 'findCompanion',
        description: 'Поиск компаньонов по email или имени',
    })
    @UseGuards(SessionAuthGuard, RolesGuard)
    findCompanion(
        @CurrentUser() user: User,
        @Args('query', { type: () => String, nullable: true })
        query?: string
    ): Promise<User[]> {
        return this.companionService.findCompanion(user._id, query);
    }

    @Mutation(() => Boolean)
    @UseGuards(SessionAuthGuard, RolesGuard)
    removeCompanion(
        @Args('user_id', { type: () => ID }) userId: Types.ObjectId,
        @Args('companion_id', { type: () => ID }) companionId: Types.ObjectId
    ): Promise<boolean> {
        return this.companionService.removeCompanion(userId, companionId);
    }
}
