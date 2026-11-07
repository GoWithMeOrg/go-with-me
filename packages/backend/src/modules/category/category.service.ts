import { Injectable } from '@nestjs/common';
import { DeleteResult, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '@/modules/category/entities/category.entity.js';
import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { UpdateCategoryInput } from '@/modules/category/dto/update-category.input.js';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>
    ) {}

    // --- получить категории по ID ---
    async getCategoriesById(category_id: Types.ObjectId): Promise<Category | null> {
        return await this.categoryModel.findById(category_id).exec();
    }

    // --- получить интересы по владельцу ---
    async getCategoriesByOwner(ownerId: Types.ObjectId): Promise<Category | null> {
        return await this.categoryModel.findOne({ ownerId }).exec();
    }

    async createCategories(createCategoryInput: CreateCategoryInput) {
        const createCategory = new this.categoryModel(createCategoryInput);
        return await createCategory.save();
    }

    async updateCategories(
        category_id: Types.ObjectId,
        updateCategoryInput: UpdateCategoryInput
    ): Promise<Category | null> {
        return await this.categoryModel.findByIdAndUpdate(category_id, updateCategoryInput, {
            new: true,
        });
    }

    async removeCategories(category_id: Types.ObjectId): Promise<DeleteResult> {
        return this.categoryModel.deleteOne({ _id: category_id }).exec();
    }
}
