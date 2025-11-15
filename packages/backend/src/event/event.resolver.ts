import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Schema as MongoSchema } from 'mongoose';

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
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventService.createEvent(createEventInput);
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
    const user = await this.userService.getUserById(event.organizer as MongoSchema.Types.ObjectId);
    return user as User;
  }
}
