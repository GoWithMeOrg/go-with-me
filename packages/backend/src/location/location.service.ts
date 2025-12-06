import { Injectable } from '@nestjs/common';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { DeleteResult, Model, Schema as MongoSchema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './entities/location.entity';

export interface OwnerFilter {
    ownerId: string; // всегда string, безопасно для GraphQL
    ownerType: 'User' | 'Event';
}

@Injectable()
export class LocationService {
    constructor(
        @InjectModel(Location.name)
        private locationModel: Model<LocationDocument>
    ) {}

    // --- получить локацию по ID ---
    async getLocationById(id: MongoSchema.Types.ObjectId): Promise<Location | null> {
        return await this.locationModel.findById(id).exec();
    }

    // --- получить локацию по владельцу ---
    async getLocationByOwner(ownerId: MongoSchema.Types.ObjectId): Promise<Location | null> {
        return await this.locationModel.findOne({ 'properties.ownerId': ownerId }).exec();
    }

    // --- создать новую локацию ---
    async createLocation(input: CreateLocationInput): Promise<Location> {
        const location = new this.locationModel({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: input.geometry?.coordinates,
            },
            properties: {
                address: input.properties?.address,
                ownerId: input.properties?.ownerId,
                ownerType: input.properties?.ownerType,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return location.save();
    }

    async updateLocation(
        id: MongoSchema.Types.ObjectId,
        input: UpdateLocationInput
    ): Promise<Location | null> {
        const update: any = {};

        // geometry update
        if (input.geometry?.coordinates) {
            update['geometry.coordinates'] = input.geometry.coordinates;
        }

        //properties update
        if (input.properties?.address !== undefined) {
            update['properties.address'] = input.properties.address;
        }

        update['properties.updatedAt'] = new Date();

        return this.locationModel.findByIdAndUpdate(id, { $set: update }, { new: true });
    }
    // --- удалить локацию ---
    removeLocation(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return this.locationModel.deleteOne({ _id: id }).exec();
    }
}
