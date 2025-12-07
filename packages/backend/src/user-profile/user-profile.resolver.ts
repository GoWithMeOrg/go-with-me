import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { UserProfile } from './dto/user-profile.entity';

import { UserProfileService } from '../user-profile/user-profile.service';

import { CreateLocationInput } from 'src/location/dto/create-location.input';
import { CreateCategoryInput } from 'src/category/dto/create-category.input';
import { CreateInterestInput } from 'src/interest/dto/create-interest.input';
import { CreateTagInput } from 'src/tag/dto/create-tag.input';

import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { UpdateLocationInput } from 'src/location/dto/update-location.input';
import { UpdateCategoryInput } from 'src/category/dto/update-category.input';
import { UpdateInterestInput } from 'src/interest/dto/update-interest.input';
import { UpdateTagInput } from 'src/tag/dto/update-tag.input';

@Resolver(() => UserProfile)
export class UserProfileResolver {
    constructor(private readonly profileService: UserProfileService) {}

    @Query(() => UserProfile, {
        name: 'userProfile',
        description: 'Составной профиль пользователя',
    })
    async userProfile(@Args('userId', { type: () => ID }) userId: MongoSchema.Types.ObjectId) {
        return this.profileService.buildProfile(userId);
    }

    @Mutation(() => UserProfile, { name: 'updateUserProfile' })
    async updateUserProfile(
        @Args('userId', { type: () => ID }) userId: MongoSchema.Types.ObjectId,
        @Args('locationId', { type: () => ID, nullable: true })
        locationId: MongoSchema.Types.ObjectId,
        @Args('categoryId', { type: () => ID, nullable: true })
        categoryId: MongoSchema.Types.ObjectId,
        @Args('interestId', { type: () => ID, nullable: true })
        interestId: MongoSchema.Types.ObjectId,
        @Args('tagId', { type: () => ID, nullable: true })
        tagId: MongoSchema.Types.ObjectId,

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
