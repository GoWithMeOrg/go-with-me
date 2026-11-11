import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';

import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { UpdateTagInput } from '@/modules/tag/dto/update-tag.input.js';
import { Tag, TagDocument } from '@/modules/tag/entities/tag.entity.js';

@Injectable()
export class TagService {
    constructor(
        @InjectModel(Tag.name)
        private tagModel: Model<TagDocument>
    ) {}

    // --- получить по ID ---
    async getTagById(tag_id: Types.ObjectId): Promise<Tag | null> {
        return await this.tagModel.findById(tag_id).exec();
    }

    // --- получить по владельцу ---
    async getTagByOwner(ownerId: Types.ObjectId): Promise<Tag | null> {
        return await this.tagModel.findOne({ ownerId }).exec();
    }

    async createTag(createTagInput: CreateTagInput) {
        const createTag = new this.tagModel(createTagInput);
        return await createTag.save();
    }

    async updateTag(tag_id: Types.ObjectId, updateTagInput: UpdateTagInput) {
        return await this.tagModel.findByIdAndUpdate(tag_id, updateTagInput, {
            new: true,
        });
    }

    async removeTag(tag_id: Types.ObjectId): Promise<DeleteResult> {
        return await this.tagModel.deleteOne({ _id: tag_id }).exec();
    }
}
