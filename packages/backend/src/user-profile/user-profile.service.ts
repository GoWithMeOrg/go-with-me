import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LocationService } from 'src/location/location.service';
import { Schema as MongoSchema } from 'mongoose';
import { InterestService } from 'src/interest/interest.service';

@Injectable()
export class UserProfileService {
    constructor(
        private readonly userService: UserService,
        private readonly locationService: LocationService,
        private readonly interestService: InterestService
    ) {}

    async buildProfile(userId: MongoSchema.Types.ObjectId) {
        const [user, location, interest] = await Promise.all([
            this.userService.getUserById(userId),
            this.locationService.getLocationByOwner(userId),
            this.interestService.getInterestByOwner(userId),
        ]);

        return { user, location, interest };
    }
}
