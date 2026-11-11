import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CurrentUser } from '@/common/decorators/current-user.decorator.js';
import { CreateCategoryInput } from '@/modules/category/dto/create-category.input.js';
import { CreateEventInput } from '@/modules/event/dto/create-event.input.js';
import { UpdateEventInput } from '@/modules/event/dto/update-event.input.js';
import { Event } from '@/modules/event/entities/event.entity.js';
import { EventService } from '@/modules/event/event.service.js';
import { EventRelationsInput } from '@/modules/event/interfaces/create-event-relations.input.js';
import { CreateInterestInput } from '@/modules/interest/dto/create-interest.input.js';
import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';
import { CreateTagInput } from '@/modules/tag/dto/create-tag.input.js';
import { User } from '@/modules/user/entities/user.entity.js';
import { UserService } from '@/modules/user/user.service.js';

@Resolver(() => Event)
export class EventResolver {
    constructor(
        private readonly eventService: EventService,
        private readonly userService: UserService
    ) {}

    @Query(() => Event, {
        name: 'getEventById',
        description: 'Получить событие по id',
    })
    getEventById(@Args('event_id', { type: () => ID }) event_id: Types.ObjectId) {
        return this.eventService.getEventById(event_id);
    }

    @Query(() => [Event], {
        name: 'getEventsByOrganizer',
        description: 'Получить все события организатора',
    })
    getEventsByOrganizer(@Args('organizer_id', { type: () => ID }) organizer_id: string) {
        return this.eventService.getEventsByOrganizer(new Types.ObjectId(organizer_id));
    }

    @Query(() => [Event], {
        name: 'getAllEvents',
        description: 'Получить все активные события с пагинацией и сортировкой',
    })
    getAllEvents(
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
        @Args('offset', { type: () => Int, nullable: true }) offset?: number,
        @Args('sort', { type: () => String, nullable: true }) sort?: string
    ) {
        return this.eventService.getAllEvents(limit, offset, sort);
    }

    @Mutation(() => Event, {
        name: 'createEvent',
        description: 'Создать событие',
    })
    createEvent(
        @CurrentUser() user: User,
        @Args('createEventInput') createEventInput: CreateEventInput,
        @Args('createLocationInput', { nullable: true }) createLocationInput: CreateLocationInput,
        @Args('createCategoryInput', { nullable: true }) createCategoryInput: CreateCategoryInput,
        @Args('createInterestInput', { nullable: true }) createInterestInput: CreateInterestInput,
        @Args('createTagInput', { nullable: true }) createTagInput: CreateTagInput
    ) {
        const relations: EventRelationsInput = {
            location: createLocationInput,
            category: createCategoryInput,
            interest: createInterestInput,
            tag: createTagInput,
        };
        return this.eventService.createEvent(user._id, createEventInput, relations);
    }

    @Mutation(() => Event, {
        name: 'updateEvent',
        description: 'Обновить данные события',
    })
    updateEvent(
        @Args('event_id', { type: () => ID }) event_id: Types.ObjectId,
        @Args('updateEventInput') updateEventInput: UpdateEventInput,
        @Args('createLocationInput', { nullable: true }) createLocationInput: CreateLocationInput,
        @Args('createCategoryInput', { nullable: true }) createCategoryInput: CreateCategoryInput,
        @Args('createInterestInput', { nullable: true }) createInterestInput: CreateInterestInput,
        @Args('createTagInput', { nullable: true }) createTagInput: CreateTagInput
    ) {
        const relations: EventRelationsInput = {
            location: createLocationInput,
            category: createCategoryInput,
            interest: createInterestInput,
            tag: createTagInput,
        };
        return this.eventService.updateEvent(event_id, updateEventInput, relations);
    }

    @Mutation(() => Boolean, {
        name: 'removeEvent',
        description: 'Удалить событие',
    })
    async removeEvent(
        @Args('event_id', { type: () => ID }) event_id: Types.ObjectId
    ): Promise<boolean> {
        return this.eventService.removeEvent(event_id);
    }

    @ResolveField(() => User, { name: 'organizer' })
    async getOrganizer(@Parent() event: Event): Promise<User> {
        if (event.organizer instanceof User) {
            return event.organizer;
        }
        const user = await this.userService.getUserById(event.organizer);
        return user as User;
    }
}
