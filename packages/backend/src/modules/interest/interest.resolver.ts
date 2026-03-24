import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { InterestService } from './interest.service';
import { Interest } from './entities/interest.entity';
import { CreateInterestInput } from './dto/create-interest.input';
import { UpdateInterestInput } from './dto/update-interest.input';
import { Schema as MongoSchema } from 'mongoose';

@Resolver(() => Interest)
export class InterestResolver {
    constructor(private readonly interestService: InterestService) {}

    @Query(() => Interest, {
        name: 'interestById',
        description: 'Поиск интересов по id',
    })
    getInterestById(
        @Args('interest_id', { type: () => ID }) interest_id: MongoSchema.Types.ObjectId
    ): Promise<Interest | null> {
        return this.interestService.getInterestById(interest_id);
    }

    @Query(() => Interest, {
        name: 'interestByOwnerId',
        description: 'Поиск интересов по ownerId',
    })
    getInterestByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: MongoSchema.Types.ObjectId
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
        @Args('interest_id', { type: () => ID }) interest_id: MongoSchema.Types.ObjectId
    ) {
        return this.interestService.updateInterest(interest_id, updateInterestInput);
    }

    @Mutation(() => Interest)
    async removeInterest(
        @Args('interest_id', { type: () => ID }) interest_id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.interestService.removeInterest(interest_id);
        return result.deletedCount > 0;
    }
}
