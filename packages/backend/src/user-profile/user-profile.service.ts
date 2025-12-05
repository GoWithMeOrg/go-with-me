import { Injectable } from '@nestjs/common';
import { Schema as MongoSchema } from 'mongoose';

import { UserService } from 'src/user/user.service';
import { LocationService } from 'src/location/location.service';
import { InterestService } from 'src/interest/interest.service';
import { CategoriesService } from 'src/categories/categories.service';

import { UpdateLocationInput } from 'src/location/dto/update-location.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { UpdateInterestInput } from 'src/interest/dto/update-interest.input';
import { UpdateCategoriesInput } from 'src/categories/dto/update-category.input';
import { CreateLocationInput } from 'src/location/dto/create-location.input';
import { CreateCategoriesInput } from 'src/categories/dto/create-category.input';
import { CreateInterestInput } from 'src/interest/dto/create-interest.input';

@Injectable()
export class UserProfileService {
    constructor(
        private readonly userService: UserService,
        private readonly locationService: LocationService,
        private readonly categoriesService: CategoriesService,
        private readonly interestService: InterestService
    ) {}

    async updateProfile(
        userId: MongoSchema.Types.ObjectId,
        locationId?: MongoSchema.Types.ObjectId,
        categoriesId?: MongoSchema.Types.ObjectId,
        interestId?: MongoSchema.Types.ObjectId,

        createLocationInput?: CreateLocationInput,
        createCategoriesInput?: CreateCategoriesInput,
        createInterestInput?: CreateInterestInput,

        updateUserInput?: UpdateUserInput,
        updateLocationInput?: UpdateLocationInput,
        updateCategoriesInput?: UpdateCategoriesInput,
        updateInterestInput?: UpdateInterestInput
    ) {
        const tasks: Promise<any>[] = [];

        // ---- Обновляем пользователя ----
        if (updateUserInput) {
            tasks.push(this.userService.updateUser(userId, updateUserInput));
        }

        // ---- Обновляем локацию ----
        if (locationId && updateLocationInput) {
            tasks.push(this.locationService.updateLocation(locationId, updateLocationInput));
        } else if (createLocationInput) {
            tasks.push(this.locationService.createLocation(createLocationInput));
        }

        // if (updateLocationInput) {
        //     if (locationId) {
        //         // ОБНОВЛЕНИЕ: ID есть, обновляем
        //         tasks.push(this.locationService.updateLocation(locationId, updateLocationInput));
        //     } else {
        //         // СОЗДАНИЕ: ID нет, создаем новую локацию
        //         tasks.push(
        //             this.locationService.createLocation(createLocationInput).then((location) => {
        //                 // Сохраняем ID, чтобы привязать его к пользователю позже
        //                 newLocationId = location._id;
        //             })
        //         );
        //     }
        // }

        // ---- Обновляем категории ----
        if (categoriesId && updateCategoriesInput) {
            tasks.push(
                this.categoriesService.updateCategories(categoriesId, updateCategoriesInput)
            );
        } else if (createCategoriesInput) {
            tasks.push(this.categoriesService.createCategories(createCategoriesInput));
        }

        // ---- Обновляем интересы ----
        if (interestId && updateInterestInput) {
            tasks.push(this.interestService.updateInterest(interestId, updateInterestInput));
        } else if (createInterestInput) {
            tasks.push(this.interestService.createInterest(createInterestInput));
        }

        // tasks['properties.updatedAt'] = new Date();

        // Выполняем обновления параллельно
        await Promise.all(tasks);

        // Возвращаем составной профиль
        return this.buildProfile(userId);
    }

    async buildProfile(userId: MongoSchema.Types.ObjectId) {
        const [user, location, categories, interest] = await Promise.all([
            this.userService.getUserById(userId),
            this.locationService.getLocationByOwner(userId),
            this.categoriesService.getCategoriesByOwner(userId),
            this.interestService.getInterestByOwner(userId),
        ]);

        return { user, location, categories, interest };
    }
}
