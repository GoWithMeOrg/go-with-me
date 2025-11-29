import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { UserProfile } from '../user-profile/dto/user-profile.type';
import { UserProfileService } from '../user-profile/user-profile.service';
import { Schema as MongoSchema } from 'mongoose';

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
}
