import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompanionService } from './companion.service';
import { Companion } from './entities/companion.entity';
import { CreateCompanionInput } from './dto/create-companion.input';
import { UpdateCompanionInput } from './dto/update-companion.input';

@Resolver(() => Companion)
export class CompanionResolver {
    constructor(private readonly companionService: CompanionService) {}

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
