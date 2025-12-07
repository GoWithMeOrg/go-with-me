import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoryService } from './category.service';

import { Schema as MongoSchema } from 'mongoose';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoriesService: CategoryService) {}

    @Query(() => Category, {
        name: 'categoriesById',
        description: 'Поиск категорий по id',
    })
    getCategoriesById(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Category | null> {
        return this.categoriesService.getCategoriesById(id);
    }

    @Query(() => Category, {
        name: 'categoriesByOwnerId',
        description: 'Поиск категорий по ownerId',
    })
    getCategoriesByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: MongoSchema.Types.ObjectId
    ): Promise<Category | null> {
        return this.categoriesService.getCategoriesByOwner(ownerId);
    }

    @Mutation(() => Category)
    createCategories(@Args('createCategoriesInput') createCategoriesInput: CreateCategoryInput) {
        return this.categoriesService.createCategories(createCategoriesInput);
    }

    @Mutation(() => Category)
    updateCategories(@Args('updateCategoriesInput') updateCategoriesInput: UpdateCategoryInput) {
        return this.categoriesService.updateCategories(
            updateCategoriesInput._id,
            updateCategoriesInput
        );
    }

    @Mutation(() => Category)
    async removeCategories(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.categoriesService.removeCategories(id);
        return result.deletedCount > 0;
    }
}
