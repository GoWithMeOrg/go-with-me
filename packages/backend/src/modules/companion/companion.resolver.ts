import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CompanionService } from './companion.service';
import { Companion } from './entities/companion.entity';
import { UseGuards } from '@nestjs/common';

import { Schema as MongoSchema } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { CompanionsResponse } from './entities/companions-response.entity';
import { SessionAuthGuard } from 'src/common/guards/session-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Resolver(() => Companion)
export class CompanionResolver {
    constructor(private readonly companionService: CompanionService) {}

    @Query(() => CompanionsResponse, {
        name: 'companionsByOwnerId',
        description: 'Поиск интересов по ownerId',
    })
    getCompanionsByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: MongoSchema.Types.ObjectId,
        @Args('limit', { type: () => Int, nullable: true })
        limit?: number,
        @Args('offset', { type: () => Int, nullable: true })
        offset?: number
    ): Promise<{ companions: User[]; totalCompanions: number }> {
        return this.companionService.getCompanionsByOwner(ownerId, limit, offset);
    }

    @Mutation(() => Boolean)
    @UseGuards(SessionAuthGuard, RolesGuard)
    removeCompanion(
        @Args('user_id', { type: () => ID }) userId: MongoSchema.Types.ObjectId,
        @Args('companion_id', { type: () => ID }) companionId: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        return this.companionService.removeCompanion(userId, companionId);
    }
}
