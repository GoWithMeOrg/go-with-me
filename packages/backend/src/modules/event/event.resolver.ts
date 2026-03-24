import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { User } from '../user/entities/user.entity';
import { Event } from './entities/event.entity';

import { UserService } from '../user/user.service';
import { EventService } from './event.service';

import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { CreateLocationInput } from '../location/dto/create-location.input';
import { CreateCategoryInput } from '../category/dto/create-category.input';
import { CreateInterestInput } from '../interest/dto/create-interest.input';
import { CreateTagInput } from '../tag/dto/create-tag.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { EventRelationsInput } from './interfaces/create-event-relations.input';

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
    getEventById(@Args('event_id', { type: () => ID }) event_id: MongoSchema.Types.ObjectId) {
        return this.eventService.getEventById(event_id);
    }

    @Query(() => [Event], {
        name: 'getEventsByOrganizer',
        description: 'Получить все события организатора',
    })
    getEventsByOrganizer(
        @Args('organizer_id', { type: () => ID }) organizer_id: MongoSchema.Types.ObjectId
    ) {
        return this.eventService.getEventsByOrganizer(organizer_id);
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
        @Args('event_id', { type: () => ID }) event_id: MongoSchema.Types.ObjectId,
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
        @Args('event_id', { type: () => ID }) event_id: MongoSchema.Types.ObjectId
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
