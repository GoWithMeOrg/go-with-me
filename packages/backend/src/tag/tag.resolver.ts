import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TagService } from './tag.service';

import { Schema as MongoSchema } from 'mongoose';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Resolver(() => Tag)
export class TagResolver {
    constructor(private readonly tagService: TagService) {}

    @Query(() => Tag, {
        name: 'tagById',
        description: 'Поиск категорий по id',
    })
    getTagById(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Tag | null> {
        return this.tagService.getTagById(id);
    }

    @Query(() => Tag, {
        name: 'tagByOwnerId',
        description: 'Поиск категорий по ownerId',
    })
    getTagByOwner(
        @Args('ownerId', { type: () => ID })
        ownerId: MongoSchema.Types.ObjectId
    ): Promise<Tag | null> {
        return this.tagService.getTagByOwner(ownerId);
    }

    @Mutation(() => Tag)
    createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
        return this.tagService.createTag(createTagInput);
    }

    @Mutation(() => Tag)
    updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
        return this.tagService.updateTag(updateTagInput._id, updateTagInput);
    }

    @Mutation(() => Tag)
    async removeTag(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.tagService.removeTag(id);
        return result.deletedCount > 0;
    }
}
