import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { UserService } from '@/modules/user/user.service';
import { LocationService } from '@/modules/location/location.service';
import { CategoryService } from '@/modules/category/category.service';
import { InterestService } from '@/modules/interest/interest.service';
import { TagService } from '@/modules/tag/tag.service';

import { UpdateUserInput } from '@/modules/user/dto/update-user.input';
import { UpdateLocationInput } from '@/modules/location/dto/update-location.input';
import { UpdateCategoryInput } from '@/modules/category/dto/update-category.input';
import { UpdateInterestInput } from '@/modules/interest/dto/update-interest.input';
import { UpdateTagInput } from '@/modules/tag/dto/update-tag.input';

import { CreateLocationInput } from '@/modules/location/dto/create-location.input';
import { CreateCategoryInput } from '@/modules/category/dto/create-category.input';
import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input';
import { CreateTagInput } from '@/modules/tag/dto/create-tag.input';

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
        userId: Types.ObjectId,
        locationId?: Types.ObjectId,
        categoryId?: Types.ObjectId,
        interestId?: Types.ObjectId,
        tagId?: Types.ObjectId,

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

    async buildProfile(userId: Types.ObjectId) {
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
