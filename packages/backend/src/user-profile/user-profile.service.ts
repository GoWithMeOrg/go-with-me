import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LocationService } from 'src/location/location.service';
import { Schema as MongoSchema } from 'mongoose';
import { InterestService } from 'src/interest/interest.service';
import { UpdateLocationInput } from 'src/location/dto/update-location.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { UpdateInterestInput } from 'src/interest/dto/update-interest.input';

@Injectable()
export class UserProfileService {
    constructor(
        private readonly userService: UserService,
        private readonly locationService: LocationService,
        private readonly interestService: InterestService
    ) {}

    async updateProfile(
        userId: MongoSchema.Types.ObjectId,
        locationId: MongoSchema.Types.ObjectId,
        interestId: MongoSchema.Types.ObjectId,
        updateUserInput: UpdateUserInput,
        updateLocationInput: UpdateLocationInput,
        updateInterestInput: UpdateInterestInput
    ) {
        const tasks: Promise<any>[] = [];

        // ---- Обновляем пользователя ----
        if (updateUserInput) {
            tasks.push(this.userService.updateUser(userId, updateUserInput));
        }

        // ---- Обновляем локацию ----
        if (updateLocationInput) {
            tasks.push(this.locationService.updateLocation(locationId, updateLocationInput));
        }

        // ---- Обновляем интересы ----
        if (updateInterestInput) {
            tasks.push(this.interestService.updateInterest(interestId, updateInterestInput));
        }

        tasks['properties.updatedAt'] = new Date();

        // Выполняем обновления параллельно
        await Promise.all(tasks);

        // Возвращаем составной профиль
        return this.buildProfile(userId);
    }

    async buildProfile(userId: MongoSchema.Types.ObjectId) {
        const [user, location, interest] = await Promise.all([
            this.userService.getUserById(userId),
            this.locationService.getLocationByOwner(userId),
            this.interestService.getInterestByOwner(userId),
        ]);

        return { user, location, interest };
    }
}
