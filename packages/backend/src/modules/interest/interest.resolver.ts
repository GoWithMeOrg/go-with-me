import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';
import { UpdateInterestInput } from '@/modules/interest/dto/update-interest.input.js';
import { Interest } from '@/modules/interest/entities/interest.entity.js';
import { InterestService } from '@/modules/interest/interest.service.js';

@Resolver(() => Interest)
export class InterestResolver {
    constructor(private readonly interestService: InterestService) {}

    @Query(() => Interest, {
        name: 'interestById',
        description: 'Поиск интересов по id',
    })
    getInterestById(
        @Args('interest_id', { type: () => ID }) interest_id: Types.ObjectId
    ): Promise<Interest | null> {
        return this.interestService.getInterestById(interest_id);
    }

    @Query(() => Interest, {
        name: 'interestByOwnerId',
        description: 'Поиск интересов по ownerId',
    })
    getInterestByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: Types.ObjectId
    ): Promise<Interest | null> {
        return this.interestService.getInterestByOwner(ownerId);
    }

    @Mutation(() => Interest)
    createInterest(@Args('createInterestInput') createInterestInput: CreateInterestInput) {
        return this.interestService.createInterest(createInterestInput);
    }

    @Mutation(() => Interest)
    updateInterest(
        @Args('updateInterestInput') updateInterestInput: UpdateInterestInput,
        @Args('interest_id', { type: () => ID }) interest_id: Types.ObjectId
    ) {
        return this.interestService.updateInterest(interest_id, updateInterestInput);
    }

    @Mutation(() => Interest)
    async removeInterest(
        @Args('interest_id', { type: () => ID }) interest_id: Types.ObjectId
    ): Promise<boolean> {
        const result = await this.interestService.removeInterest(interest_id);
        return result.deletedCount > 0;
    }
}
