import { Injectable } from '@nestjs/common';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Injectable()
export class TagService {
    constructor(
        @InjectModel(Tag.name)
        private tagModel: Model<TagDocument>
    ) {}

    // --- получить по ID ---
    async getTagById(id: MongoSchema.Types.ObjectId): Promise<Tag | null> {
        return await this.tagModel.findById(id).exec();
    }

    // --- получить по владельцу ---
    async getTagByOwner(ownerId: MongoSchema.Types.ObjectId): Promise<Tag | null> {
        return await this.tagModel.findOne({ ownerId }).exec();
    }

    async createTag(createTagInput: CreateTagInput) {
        const createTag = new this.tagModel(createTagInput);
        return await createTag.save();
    }

    async updateTag(id: MongoSchema.Types.ObjectId, updateTagInput: UpdateTagInput) {
        return await this.tagModel.findByIdAndUpdate(id, updateTagInput, {
            new: true,
        });
    }

    async removeTag(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return await this.tagModel.deleteOne({ _id: id }).exec();
    }
}
