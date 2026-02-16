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
    async getCategoriesById(id: MongoSchema.Types.ObjectId): Promise<Category | null> {
        return await this.categoryModel.findById(id).exec();
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
        id: MongoSchema.Types.ObjectId,
        updateCategoryInput: UpdateCategoryInput
    ) {
        return await this.categoryModel.findByIdAndUpdate(id, updateCategoryInput, {
            new: true,
        });
    }

    async removeCategories(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.categoryModel.deleteOne({ _id: id }).exec();
    }
}
