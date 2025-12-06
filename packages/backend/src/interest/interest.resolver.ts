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
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Interest | null> {
        return this.interestService.getInterestById(id);
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
    updateInterest(@Args('updateInterestInput') updateInterestInput: UpdateInterestInput) {
        return this.interestService.updateInterest(updateInterestInput._id, updateInterestInput);
    }

    @Mutation(() => Interest)
    async removeInterest(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.interestService.removeInterest(id);
        return result.deletedCount > 0;
    }
}
