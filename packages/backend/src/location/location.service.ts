import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongoSchema } from 'mongoose';

import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location, LocationDocument } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>
  ) {}

  getLocationById(id: MongoSchema.Types.ObjectId) {
    return this.locationModel.findById(id);
  }

  createLocation(createLocationInput: CreateLocationInput) {
    const createLocation = new this.locationModel(createLocationInput);
    return createLocation.save();
  }

  updateLocation(id: MongoSchema.Types.ObjectId, updateLocationInput: UpdateLocationInput) {
    return this.locationModel.findByIdAndUpdate(id, updateLocationInput, {
      new: true,
    });
  }

  async removeLocation(id: MongoSchema.Types.ObjectId): Promise<boolean> {
    const result = await this.locationModel.deleteOne({ _id: id }).exec();
    return (result.deletedCount ?? 0) > 0;
  }
}
