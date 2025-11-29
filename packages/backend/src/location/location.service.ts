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
    getLocationById(id: MongoSchema.Types.ObjectId): Promise<Location | null> {
        return this.locationModel.findById(id).exec();
    }

    // --- получить локацию по владельцу ---
    async getLocationByOwner(ownerId: MongoSchema.Types.ObjectId): Promise<Location | null> {
        return this.locationModel.findOne({ 'properties.ownerId': ownerId }).exec();
    }

    // --- создать новую локацию ---
    async createLocation(input: CreateLocationInput): Promise<Location> {
        const location = new this.locationModel({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: input.coordinates,
            },
            properties: {
                ...input.properties,
                ownerId: input.ownerId,
                ownerType: input.ownerType,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return location.save();
    }

    // --- обновить существующую локацию ---
    async updateLocation(
        id: MongoSchema.Types.ObjectId,
        updateLocationInput: UpdateLocationInput
    ): Promise<Location | null> {
        const update: any = {};

        // --- обновление координат ---
        if (updateLocationInput.coordinates) {
            update.geometry = {
                type: 'Point',
                coordinates: updateLocationInput.coordinates,
            };
        }

        // --- обновление properties ---
        if (updateLocationInput.properties) {
            update['properties'] = {
                ...updateLocationInput.properties,
                updatedAt: new Date(),
            };
        } else {
            // если properties не переданы, обновляем только updatedAt
            update['properties.updatedAt'] = new Date();
        }

        return this.locationModel.findByIdAndUpdate(id, update, { new: true }).exec();
    }

    // --- удалить локацию ---
    removeLocation(id: MongoSchema.Types.ObjectId): Promise<DeleteResult> {
        return this.locationModel.deleteOne({ _id: id }).exec();
    }
}
