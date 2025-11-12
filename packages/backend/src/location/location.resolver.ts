import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location } from './entities/location.entity';
import { LocationService } from './location.service';

@Resolver('Location')
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => Location, {
    name: 'locationById',
    description: 'Поиск места по id',
  })
  getLocationById(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId) {
    return this.locationService.getLocationById(id);
  }

  @Mutation(() => Location, {
    name: 'createLocation',
    description: 'Создать локацию',
  })
  createLocation(@Args('createLocationInput') createLocationInput: CreateLocationInput) {
    return this.locationService.createLocation(createLocationInput);
  }

  @Mutation(() => Location, {
    name: 'updateLocation',
    description: 'Обновить локацию',
  })
  updateLocation(@Args('updateLocationInput') updateLocationInput: UpdateLocationInput) {
    return this.locationService.updateLocation(updateLocationInput._id, updateLocationInput);
  }

  @Mutation(() => Boolean, {
    name: 'removeLocation',
    description: 'Удалить локацию',
  })
  removeLocation(@Args('id', { type: () => ID }) id: MongoSchema.Types.ObjectId): Promise<boolean> {
    return this.locationService.removeLocation(id);
  }
}
