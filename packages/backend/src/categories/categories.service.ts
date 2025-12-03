import { Injectable } from '@nestjs/common';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Categories, CategoriesDocument } from './entities/category.entity';
import { CreateCategoriesInput } from './dto/create-category.input';
import { UpdateCategoriesInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Categories.name)
        private categoriesModel: Model<CategoriesDocument>
    ) {}

    // --- получить категории по ID ---
    async getCategoriesById(id: MongoSchema.Types.ObjectId): Promise<Categories | null> {
        return await this.categoriesModel.findById(id).exec();
    }

    // --- получить интересы по владельцу ---
    async getCategoriesByOwner(ownerId: MongoSchema.Types.ObjectId): Promise<Categories | null> {
        return await this.categoriesModel.findOne({ ownerId }).exec();
    }

    async createCategories(createCategoriesInput: CreateCategoriesInput) {
        const createCategories = new this.categoriesModel(createCategoriesInput);
        return await createCategories.save();
    }

    async updateCategories(
        id: MongoSchema.Types.ObjectId,
        updateInterestInput: UpdateCategoriesInput
    ) {
        return await this.categoriesModel.findByIdAndUpdate(id, updateInterestInput, {
            new: true,
        });
    }

    async removeCategories(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.categoriesModel.deleteOne({ _id: id }).exec();
    }
}
