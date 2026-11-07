import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';
import { Types } from 'mongoose';

import { SeedsService } from '@/modules/seeds/seeds.service.js';
import { SeedUserResult } from '@/modules/seeds/entities/seed-user.entity.js';
import { SeedUserInput } from '@/modules/seeds/dto/create-seed-user.input.js';
import { SeedEventsInput } from '@/modules/seeds/dto/create-seed-events.input.js';
import { Event } from '@/modules/event/entities/event.entity.js';

@Resolver()
export class SeedsResolver {
    constructor(private readonly seedsService: SeedsService) {}

    @Mutation(() => SeedUserResult, {
        name: 'seedUsers',
        description: 'Генерация тестовых данных (доступно только в DEV режиме)',
    })
    async seedUsers(@Args('inputs') inputs: SeedUserInput): Promise<SeedUserResult> {
        if (process.env.NODE_ENV === 'production') {
            throw new ForbiddenException('Seeding is not allowed in production');
        }

        return this.seedsService.seedUsers(inputs);
    }

    @Mutation(() => Event, {
        name: 'seedEvents',
        description: 'Генерация событий от разных пользователей (доступно только в DEV режиме)',
    })
    async seedEvents(@Args('inputs') inputs: SeedEventsInput): Promise<Event> {
        if (process.env.NODE_ENV === 'production') {
            throw new ForbiddenException('Seeding is not allowed in production');
        }

        const organizer = new Types.ObjectId(inputs.organizer);
        return this.seedsService.seedEvents(inputs.event, organizer, inputs.relations);
    }
}
