import { Injectable } from '@nestjs/common';
import { Schema as MongoSchema } from 'mongoose';

import { UserService } from 'src/modules/user/user.service';
import { LocationService } from 'src/modules/location/location.service';
import { CategoryService } from 'src/modules/category/category.service';
import { InterestService } from 'src/modules/interest/interest.service';
import { TagService } from 'src/modules/tag/tag.service';

import { UpdateUserInput } from 'src/modules/user/dto/update-user.input';
import { UpdateLocationInput } from 'src/modules/location/dto/update-location.input';
import { UpdateCategoryInput } from 'src/modules/category/dto/update-category.input';
import { UpdateInterestInput } from 'src/modules/interest/dto/update-interest.input';
import { UpdateTagInput } from 'src/modules/tag/dto/update-tag.input';

import { CreateLocationInput } from 'src/modules/location/dto/create-location.input';
import { CreateCategoryInput } from 'src/modules/category/dto/create-category.input';
import { CreateInterestInput } from 'src/modules/interest/dto/create-interest.input';
import { CreateTagInput } from 'src/modules/tag/dto/create-tag.input';

@Injectable()
export class UserProfileService {
    constructor(
        private readonly userService: UserService,
        private readonly locationService: LocationService,
        private readonly categoryService: CategoryService,
        private readonly interestService: InterestService,
        private readonly tagService: TagService
    ) {}

    async updateProfile(
        userId: MongoSchema.Types.ObjectId,
        locationId?: MongoSchema.Types.ObjectId,
        categoryId?: MongoSchema.Types.ObjectId,
        interestId?: MongoSchema.Types.ObjectId,
        tagId?: MongoSchema.Types.ObjectId,

        createLocationInput?: CreateLocationInput,
        createCategoryInput?: CreateCategoryInput,
        createInterestInput?: CreateInterestInput,
        createTagInput?: CreateTagInput,

        updateUserInput?: UpdateUserInput,
        updateLocationInput?: UpdateLocationInput,
        updateCategoryInput?: UpdateCategoryInput,
        updateInterestInput?: UpdateInterestInput,
        updateTagInput?: UpdateTagInput
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

        // ---- Обновляем категории ----
        if (categoryId && updateCategoryInput) {
            tasks.push(this.categoryService.updateCategories(categoryId, updateCategoryInput));
        } else if (createCategoryInput) {
            tasks.push(this.categoryService.createCategories(createCategoryInput));
        }

        // ---- Обновляем интересы ----
        if (interestId && updateInterestInput) {
            tasks.push(this.interestService.updateInterest(interestId, updateInterestInput));
        } else if (createInterestInput) {
            tasks.push(this.interestService.createInterest(createInterestInput));
        }

        // ---- Обновляем теги ----
        if (tagId && updateTagInput) {
            tasks.push(this.tagService.updateTag(tagId, updateTagInput));
        } else if (createTagInput) {
            tasks.push(this.tagService.createTag(createTagInput));
        }

        // Выполняем обновления параллельно
        await Promise.all(tasks);

        // Возвращаем составной профиль
        return this.buildProfile(userId);
    }

    async buildProfile(userId: MongoSchema.Types.ObjectId) {
        const [user, location, category, interest, tag] = await Promise.all([
            this.userService.getUserById(userId),
            this.locationService.getLocationByOwner(userId),
            this.categoryService.getCategoriesByOwner(userId),
            this.interestService.getInterestByOwner(userId),
            this.tagService.getTagByOwner(userId),
        ]);

        return { user, location, category, interest, tag };
    }
}
