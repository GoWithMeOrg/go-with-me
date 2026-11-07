import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TagService } from '@/modules/tag/tag.service.js';

import { Types } from 'mongoose';
import { Tag } from '@/modules/tag/entities/tag.entity.js';
import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { UpdateTagInput } from '@/modules/tag/dto/update-tag.input.js';

@Resolver(() => Tag)
export class TagResolver {
    constructor(private readonly tagService: TagService) {}

    @Query(() => Tag, {
        name: 'tagById',
        description: 'Поиск категорий по id',
    })
    getTagById(
        @Args('tag_id', { type: () => ID }) tag_id: Types.ObjectId
    ): Promise<Tag | null> {
        return this.tagService.getTagById(tag_id);
    }

    @Query(() => Tag, {
        name: 'tagByOwnerId',
        description: 'Поиск категорий по ownerId',
    })
    getTagByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: Types.ObjectId
    ): Promise<Tag | null> {
        return this.tagService.getTagByOwner(ownerId);
    }

    @Mutation(() => Tag)
    createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
        return this.tagService.createTag(createTagInput);
    }

    @Mutation(() => Tag)
    updateTag(
        @Args('updateTagInput') updateTagInput: UpdateTagInput,
        @Args('tag_id', { type: () => ID }) tag_id: Types.ObjectId
    ) {
        return this.tagService.updateTag(tag_id, updateTagInput);
    }

    @Mutation(() => Tag)
    async removeTag(
        @Args('tag_id', { type: () => ID }) tag_id: Types.ObjectId
    ): Promise<boolean> {
        const result = await this.tagService.removeTag(tag_id);
        return result.deletedCount > 0;
    }
}
