import { Injectable } from '@nestjs/common';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>
    ) {}

    // --- получить категории по ID ---
    async getCategoriesById(category_id: MongoSchema.Types.ObjectId): Promise<Category | null> {
        return await this.categoryModel.findById(category_id).exec();
    }

    // --- получить интересы по владельцу ---
    async getCategoriesByOwner(ownerId: MongoSchema.Types.ObjectId): Promise<Category | null> {
        return await this.categoryModel.findOne({ ownerId }).exec();
    }

    async createCategories(createCategoryInput: CreateCategoryInput) {
        const createCategory = new this.categoryModel(createCategoryInput);
        return await createCategory.save();
    }

    async updateCategories(
        category_id: MongoSchema.Types.ObjectId,
        updateCategoryInput: UpdateCategoryInput
    ): Promise<Category | null> {
        return await this.categoryModel.findByIdAndUpdate(category_id, updateCategoryInput, {
            new: true,
        });
    }

    async removeCategories(category_id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.categoryModel.deleteOne({ _id: category_id }).exec();
    }
}
