import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Schema as MongoSchema } from 'mongoose';
import { CreateLocationInput } from '../location/dto/create-location.input';
import { CreateCategoryInput } from '../category/dto/create-category.input';
import { CreateInterestInput } from '../interest/dto/create-interest.input';
import { CreateTagInput } from '../tag/dto/create-tag.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Resolver(() => Event)
export class EventResolver {
    constructor(
        private readonly eventService: EventService,
        private readonly userService: UserService
    ) {}

    @Query(() => Event, {
        name: 'event',
        description: 'Получить событие по id',
    })
    getEvent(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId) {
        console.log('getEvent', id);
        return this.eventService.getEventById(id);
    }

    @Query(() => [Event], {
        name: 'events',
        description: 'Получить все события',
    })
    getAllEvents() {
        return this.eventService.getAllEvents();
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
        return this.eventService.createEvent(
            user._id,
            createEventInput,
            createLocationInput,
            createCategoryInput,
            createInterestInput,
            createTagInput
        );
    }

    @Mutation(() => Event, {
        name: 'updateEvent',
        description: 'Обновить данные события',
    })
    updateEvent(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId,
        @Args('updateEventInput') updateEventInput: UpdateEventInput
    ) {
        return this.eventService.updateEvent(id, updateEventInput);
    }

    @Mutation(() => Boolean, {
        name: 'removeEvent',
        description: 'Удалить событие',
    })
    async removeEvent(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.eventService.removeEvent(id);
        return result.deletedCount > 0;
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
