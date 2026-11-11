import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { UpdateCategoryInput } from '@/modules/category/dto/update-category.input.js';
import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';
import { UpdateInterestInput } from '@/modules/interest/dto/update-interest.input.js';
import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';
import { UpdateLocationInput } from '@/modules/location/dto/update-location.input.js';
import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { UpdateTagInput } from '@/modules/tag/dto/update-tag.input.js';
import { UserProfile } from '@/modules/user-profile/entities/user-profile.entity.js';
import { UserProfileService } from '@/modules/user-profile/user-profile.service.js';
import { UpdateUserInput } from '@/modules/user/dto/update-user.input.js';

@Resolver(() => UserProfile)
export class UserProfileResolver {
    constructor(private readonly profileService: UserProfileService) {}

    @Query(() => UserProfile, {
        name: 'userProfile',
        description: 'Составной профиль пользователя',
    })
    async userProfile(@Args('userId', { type: () => ID }) userId: Types.ObjectId) {
        return this.profileService.buildProfile(userId);
    }

    @Mutation(() => UserProfile, { name: 'updateUserProfile' })
    async updateUserProfile(
        @Args('userId', { type: () => ID }) userId: Types.ObjectId,
        @Args('locationId', { type: () => ID, nullable: true })
        locationId: Types.ObjectId,
        @Args('categoryId', { type: () => ID, nullable: true })
        categoryId: Types.ObjectId,
        @Args('interestId', { type: () => ID, nullable: true })
        interestId: Types.ObjectId,
        @Args('tagId', { type: () => ID, nullable: true })
        tagId: Types.ObjectId,

        @Args('createLocationInput', { nullable: true }) createLocationInput: CreateLocationInput,
        @Args('createCategoryInput', { nullable: true })
        createCategoryInput: CreateCategoryInput,
        @Args('createInterestInput', { nullable: true }) createInterestInput: CreateInterestInput,
        @Args('createTagInput', { nullable: true }) createTagInput: CreateTagInput,

        @Args('updateUserInput', { nullable: true }) updateUserInput: UpdateUserInput,
        @Args('updateLocationInput', { nullable: true }) updateLocationInput: UpdateLocationInput,
        @Args('updateCategoryInput', { nullable: true })
        updateCategoryInput: UpdateCategoryInput,

        @Args('updateInterestInput', { nullable: true }) updateInterestInput: UpdateInterestInput,
        @Args('updateTagInput', { nullable: true }) updateTagInput: UpdateTagInput
    ) {
        return this.profileService.updateProfile(
            userId,
            locationId,
            categoryId,
            interestId,
            tagId,

            createLocationInput,
            createCategoryInput,
            createInterestInput,
            createTagInput,

            updateUserInput,
            updateLocationInput,
            updateCategoryInput,
            updateInterestInput,
            updateTagInput
        );
    }
}
