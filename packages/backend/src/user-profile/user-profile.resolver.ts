import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { UserProfile } from '../user-profile/dto/user-profile.type';
import { UserProfileService } from '../user-profile/user-profile.service';
import { Schema as MongoSchema } from 'mongoose';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { UpdateLocationInput } from 'src/location/dto/update-location.input';
import { UpdateInterestInput } from 'src/interest/dto/update-interest.input';

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
        @Args('locationId', { type: () => ID }) locationId: MongoSchema.Types.ObjectId,
        @Args('interestId', { type: () => ID }) interestId: MongoSchema.Types.ObjectId,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
        @Args('updateInterestInput') updateInterestInput: UpdateInterestInput
    ) {
        return this.profileService.updateProfile(
            userId,
            locationId,
            interestId,
            updateUserInput,
            updateLocationInput,
            updateInterestInput
        );
    }
}
