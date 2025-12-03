import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';

import { Schema as MongoSchema } from 'mongoose';
import { Categories } from './entities/category.entity';
import { CreateCategoriesInput } from './dto/create-category.input';
import { UpdateCategoriesInput } from './dto/update-category.input';

@Resolver(() => Categories)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => Categories, {
        name: 'categoriesById',
        description: 'Поиск категорий по id',
    })
    getCategoriesById(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Categories | null> {
        return this.categoriesService.getCategoriesById(id);
    }

    @Query(() => Categories, {
        name: 'categoriesByOwnerId',
        description: 'Поиск категорий по ownerId',
    })
    getCategoriesByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: MongoSchema.Types.ObjectId
    ): Promise<Categories | null> {
        return this.categoriesService.getCategoriesByOwner(ownerId);
    }

    @Mutation(() => Categories)
    createCategories(@Args('createCategoriesInput') createCategoriesInput: CreateCategoriesInput) {
        return this.categoriesService.createCategories(createCategoriesInput);
    }

    @Mutation(() => Categories)
    updateCategories(@Args('updateCategoriesInput') updateCategoriesInput: UpdateCategoriesInput) {
        return this.categoriesService.updateCategories(
            updateCategoriesInput._id,
            updateCategoriesInput
        );
    }

    @Mutation(() => Categories)
    async removeCategories(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.categoriesService.removeCategories(id);
        return result.deletedCount > 0;
    }
}
