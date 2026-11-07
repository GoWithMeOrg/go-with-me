import { CategoryService } from '@/modules/category/category.service.js';
import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { CreateEventInput } from '@/modules/event/dto/create-event.input.js';
import { Event } from '@/modules/event/entities/event.entity.js';
import { EventService } from '@/modules/event/event.service.js';
import { EventRelationsInput } from '@/modules/event/interfaces/create-event-relations.input.js';
import { EventRelationsService } from '@/modules/event/services/event-relations.service.js';
import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';
import { InterestService } from '@/modules/interest/interest.service.js';
import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';
import { LocationService } from '@/modules/location/location.service.js';
import { SeedUserResult } from '@/modules/seeds/entities/seed-user.entity.js';
import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { TagService } from '@/modules/tag/tag.service.js';
import { CreateUserInput } from '@/modules/user/dto/create-user.input.js';
import { UserService } from '@/modules/user/user.service.js';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class SeedsService {
    constructor(
        private readonly userService: UserService,
        private readonly eventService: EventService,
        private readonly locationService: LocationService,
        private readonly categoryService: CategoryService,
        private readonly interestService: InterestService,
        private readonly tagService: TagService,
        private readonly relationsService: EventRelationsService
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
        const tasks: Record<string, Promise<unknown>> = {};

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
            (finalResult as Record<string, unknown>)[key] = results[index];
        });

        return finalResult as SeedUserResult;
    }

    async seedEvents(
        createEventInput: CreateEventInput,
        organizer: Types.ObjectId,
        relations?: EventRelationsInput
    ): Promise<Event> {
        const createdEvent = await this.eventService.createEvent(organizer, createEventInput);
        if (relations) await this.relationsService.createRelations(createdEvent, relations);

        return createdEvent;
    }
}
