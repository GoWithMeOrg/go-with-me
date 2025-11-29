import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LocationService } from 'src/location/location.service';
import { Schema as MongoSchema } from 'mongoose';

@Injectable()
export class UserProfileService {
    constructor(
        private readonly userService: UserService,
        private readonly locationService: LocationService
    ) {}

    async buildProfile(userId: MongoSchema.Types.ObjectId) {
        const [user, location] = await Promise.all([
            this.userService.getUserById(userId),
            this.locationService.getLocationByOwner(userId),
        ]);

        return { user, location };
    }
}
