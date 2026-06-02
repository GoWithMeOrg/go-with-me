import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CategoryService } from './category.service';

import { Types } from 'mongoose';
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

    @Mutation(() => Category)
    async removeCategories(
        @Args('category_id', { type: () => ID }) category_id: Types.ObjectId
    ): Promise<boolean> {
        const result = await this.categoriesService.removeCategories(category_id);
        return result.deletedCount > 0;
    }
}
