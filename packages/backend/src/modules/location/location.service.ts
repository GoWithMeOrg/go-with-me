import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';

import { CreateLocationInput } from '@/modules/location/dto/create-location.input.js';
import { UpdateLocationInput } from '@/modules/location/dto/update-location.input.js';
import { Location, LocationDocument } from '@/modules/location/entities/location.entity.js';

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
    async getLocationById(id: Types.ObjectId): Promise<Location | null> {
        return await this.locationModel.findById(id).exec();
    }

    // --- получить локацию по владельцу ---
    async getLocationByOwner(ownerId: Types.ObjectId): Promise<Location | null> {
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
            },
        });
        return location.save();
    }

    async updateLocation(id: Types.ObjectId, input: UpdateLocationInput): Promise<Location | null> {
        const update: Record<string, unknown> = {};

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
    removeLocation(id: Types.ObjectId): Promise<DeleteResult> {
        return this.locationModel.deleteOne({ _id: id }).exec();
    }
}
