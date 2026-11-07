import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoryService } from '@/modules/category/category.service.js';

import { Types } from 'mongoose';
import { Category } from '@/modules/category/entities/category.entity.js';
import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { UpdateCategoryInput } from '@/modules/category/dto/update-category.input.js';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoriesService: CategoryService) {}

    @Query(() => Category, {
        name: 'categoriesById',
        description: 'Поиск категорий по id',
    })
    getCategoriesById(
        @Args('category_id', { type: () => ID }) category_id: Types.ObjectId
    ): Promise<Category | null> {
        return this.categoriesService.getCategoriesById(category_id);
    }

    @Query(() => Category, {
        name: 'categoriesByOwnerId',
        description: 'Поиск категорий по ownerId',
    })
    getCategoriesByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: Types.ObjectId
    ): Promise<Category | null> {
        return this.categoriesService.getCategoriesByOwner(ownerId);
    }

    @Mutation(() => Category)
    createCategories(@Args('createCategoriesInput') createCategoriesInput: CreateCategoryInput) {
        return this.categoriesService.createCategories(createCategoriesInput);
    }

    @Mutation(() => Category)
    updateCategories(
        @Args('category_id', { type: () => ID }) category_id: Types.ObjectId,
        @Args('updateCategoriesInput') updateCategoriesInput: UpdateCategoryInput
    ) {
        return this.categoriesService.updateCategories(category_id, updateCategoriesInput);
    }

    @Mutation(() => Boolean)
    async removeCategories(
        @Args('category_id', { type: () => ID }) category_id: Types.ObjectId
    ): Promise<boolean> {
        const result = await this.categoriesService.removeCategories(category_id);
        return result.deletedCount > 0;
    }
}
