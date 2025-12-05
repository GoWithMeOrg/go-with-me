import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location } from './entities/location.entity';
import { Schema as MongoSchema } from 'mongoose';

@Resolver(() => Location)
export class LocationResolver {
    constructor(private readonly locationService: LocationService) {}

    @Query(() => Location, {
        name: 'locationById',
        description: 'Поиск места по id',
    })
    getLocationById(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<Location | null> {
        return this.locationService.getLocationById(id);
    }

    @Query(() => Location, {
        name: 'locationByOwnerId',
        description: 'Поиск места по ownerId',
    })
    getLocationByOwner(
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId
    ): Promise<Location | null> {
        return this.locationService.getLocationByOwner(ownerId);
    }

    @Mutation(() => Location, {
        name: 'createLocation',
        description: 'Создать локацию',
    })
    createLocation(
        @Args('createLocationInput', { type: () => CreateLocationInput })
        createLocationInput: CreateLocationInput
    ): Promise<Location | null> {
        return this.locationService.createLocation(createLocationInput);
    }

    @Mutation(() => Location, {
        name: 'updateLocation',
        description: 'Обновить локацию',
    })
    updateLocation(
        @Args('updateLocationInput') updateLocationInput: UpdateLocationInput
    ): Promise<Location | null> {
        return this.locationService.updateLocation(updateLocationInput._id, updateLocationInput);
    }

    @Mutation(() => Boolean, {
        name: 'removeLocation',
        description: 'Удалить локацию',
    })
    async removeLocation(
        @Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const result = await this.locationService.removeLocation(id);
        return result.deletedCount > 0;
    }
}
