import { Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './entities/location.entity';

@Injectable()
export class LocationService {
    constructor(
        @InjectModel(Location.name)
        private locationModel: Model<LocationDocument>
    ) {}

    getLocationById(id: MongoSchema.Types.ObjectId): Promise<Location | null> {
        return this.locationModel.findById(id);
    }

    async getLocationByOwner(ownerId: MongoSchema.Types.ObjectId): Promise<Location | null> {
        return this.locationModel.findOne({ ownerId }).exec();
    }

    createLocation(createLocationInput: CreateLocationInput): Promise<Location | null> {
        const createLocation = new this.locationModel(createLocationInput);
        return createLocation.save();
    }

    // updateLocation(
    //     id: MongoSchema.Types.ObjectId,
    //     updateLocationInput: UpdateLocationInput
    // ): Promise<Location | null> {
    //     return this.locationModel.findByIdAndUpdate(id, updateLocationInput, {
    //         new: true,
    //     });
    // }

    async updateLocation(id: MongoSchema.Types.ObjectId, updateLocationInput: UpdateLocationInput) {
        return this.locationModel.findByIdAndUpdate(
            id,
            {
                coordinates: updateLocationInput.coordinates,
                properties: updateLocationInput.properties,
            },
            { new: true }
        );
        // .lean()
        // .exec();
    }

    removeLocation(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return this.locationModel.deleteOne({ _id: id }).exec();
    }
}
