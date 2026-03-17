import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LocationService } from '../location/location.service';
import { CategoryService } from '../category/category.service';
import { InterestService } from '../interest/interest.service';
import { TagService } from '../tag/tag.service';

import { CreateLocationInput } from '../location/dto/create-location.input';
import { CreateCategoryInput } from '../category/dto/create-category.input';
import { CreateInterestInput } from '../interest/dto/create-interest.input';
import { CreateTagInput } from '../tag/dto/create-tag.input';
import { CreateUserInput } from '../user/dto/create-user.input';
import { SeedUserResult } from './entities/seed-user.entity';

@Injectable()
export class SeedsService {
    constructor(
        private readonly userService: UserService,
        private readonly locationService: LocationService,
        private readonly categoryService: CategoryService,
        private readonly interestService: InterestService,
        private readonly tagService: TagService
    ) {}

    async seedUsers(inputs: {
        user?: CreateUserInput;
        location?: CreateLocationInput;
        category?: CreateCategoryInput;
        interest?: CreateInterestInput;
        tag?: CreateTagInput;
    }): Promise<SeedUserResult> {
        const { user, location, category, interest, tag } = inputs;
        const finalResult: Partial<SeedUserResult> = {};

        if (!user) {
            throw new Error('User input is required to seed related entities');
        }

        const createdUser = await this.userService.createUser(user);
        finalResult.user = createdUser;

        const userId = createdUser._id;

        // Объект для хранения промисов, чтобы запустить их параллельно
        const tasks: Record<string, Promise<any>> = {};

        if (location && userId) {
            location.properties.ownerId = userId;
            location.properties.ownerType = 'User';
            tasks.location = this.locationService.createLocation(location);
        }

        if (category && userId) {
            category.ownerId = userId;
            category.ownerType = 'User';
            tasks.category = this.categoryService.createCategories(category);
        }

        if (interest && userId) {
            interest.ownerId = userId;
            interest.ownerType = 'User';
            tasks.interest = this.interestService.createInterest(interest);
        }

        if (tag && userId) {
            tag.ownerId = userId;
            tag.ownerType = 'User';
            tasks.tag = this.tagService.createTag(tag);
        }

        // Ждем выполнения всех запущенных задач
        const results = await Promise.all(Object.values(tasks));
        const keys = Object.keys(tasks);

        keys.forEach((key, index) => {
            (finalResult as any)[key] = results[index];
        });

        return finalResult as SeedUserResult;
    }
}
