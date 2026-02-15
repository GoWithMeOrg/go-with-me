import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SeedsService } from './seeds.service';
import { ForbiddenException } from '@nestjs/common';
import { SeedUserResult } from './entities/seed-user.entity';
import { SeedUserInput } from './dto/create-seed-user.input';

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
}
