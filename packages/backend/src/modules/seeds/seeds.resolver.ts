import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';

import { SeedsService } from './seeds.service';
import { SeedUserResult } from './entities/seed-user.entity';
import { SeedUserInput } from './dto/create-seed-user.input';
import { SeedEventsInput } from './dto/create-seed-events.input';
import { Event } from '../event/entities/event.entity';

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

        return this.seedsService.seedEvents(inputs.event, inputs.organizer, inputs.relations);
    }
}
