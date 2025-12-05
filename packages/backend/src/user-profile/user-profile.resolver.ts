import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { UserProfile } from '../user-profile/dto/user-profile.type';
import { UserProfileService } from '../user-profile/user-profile.service';
import { Schema as MongoSchema } from 'mongoose';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { UpdateLocationInput } from 'src/location/dto/update-location.input';
import { UpdateInterestInput } from 'src/interest/dto/update-interest.input';
import { UpdateCategoriesInput } from 'src/categories/dto/update-category.input';

import { CreateLocationInput } from 'src/location/dto/create-location.input';
import { CreateCategoriesInput } from 'src/categories/dto/create-category.input';
import { CreateInterestInput } from 'src/interest/dto/create-interest.input';

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
        @Args('categoriesId', { type: () => ID, nullable: true })
        categoriesId: MongoSchema.Types.ObjectId,
        @Args('interestId', { type: () => ID, nullable: true })
        interestId: MongoSchema.Types.ObjectId,

        @Args('createLocationInput', { nullable: true }) createLocationInput: CreateLocationInput,
        @Args('createCategoriesInput', { nullable: true })
        createCategoriesInput: CreateCategoriesInput,
        @Args('createInterestInput', { nullable: true }) createInterestInput: CreateInterestInput,

        @Args('updateUserInput', { nullable: true }) updateUserInput: UpdateUserInput,
        @Args('updateLocationInput', { nullable: true }) updateLocationInput: UpdateLocationInput,
        @Args('updateCategoriesInput', { nullable: true })
        updateCategoriesInput: UpdateCategoriesInput,
        @Args('updateInterestInput', { nullable: true }) updateInterestInput: UpdateInterestInput
    ) {
        return this.profileService.updateProfile(
            userId,
            locationId,
            categoriesId,
            interestId,
            createLocationInput,
            createCategoriesInput,
            createInterestInput,
            updateUserInput,
            updateLocationInput,
            updateCategoriesInput,
            updateInterestInput
        );
    }
}
