import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CompanionService } from './companion.service';
import { Companion } from './entities/companion.entity';

import { Schema as MongoSchema } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { CompanionsResponse } from './entities/companions-response.entity';

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

    // @Mutation(() => Companion)
    // createCompanion(@Args('createCompanionInput') createCompanionInput: CreateCompanionInput) {
    //     return this.companionService.create(createCompanionInput);
    // }

    // @Query(() => [Companion], { name: 'companion' })
    // findAll() {
    //     return this.companionService.findAll();
    // }

    // @Query(() => Companion, { name: 'companion' })
    // findOne(@Args('id', { type: () => Int }) id: number) {
    //     return this.companionService.findOne(id);
    // }

    // @Mutation(() => Companion)
    // updateCompanion(@Args('updateCompanionInput') updateCompanionInput: UpdateCompanionInput) {
    //     return this.companionService.update(updateCompanionInput.id, updateCompanionInput);
    // }

    // @Mutation(() => Companion)
    // removeCompanion(@Args('id', { type: () => Int }) id: number) {
    //     return this.companionService.remove(id);
    // }
}
