import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongoSchema } from 'mongoose';
import { Event } from '../entities/event.entity';
import { CreateEventInput } from '../dto/create-event.input';

@Injectable()
export class EventCrudService {
    constructor(
        @InjectModel(Event.name)
        private readonly eventModel: Model<Event>
    ) {}

    async create(organizer: MongoSchema.Types.ObjectId, input: CreateEventInput): Promise<Event> {
        const event = new this.eventModel({ ...input, organizer });
        return event.save();
    }

    async findById(id: MongoSchema.Types.ObjectId): Promise<Event | null> {
        return this.eventModel.findById(id).exec();
    }

    async findByOrganizer(organizerId: MongoSchema.Types.ObjectId): Promise<Event[]> {
        return this.eventModel.find({ organizer: organizerId }).exec();
    }

    async update(
        id: MongoSchema.Types.ObjectId,
        input: Partial<CreateEventInput>
    ): Promise<Event | null> {
        return this.eventModel.findByIdAndUpdate(id, input, { new: true }).exec();
    }

    async delete(id: MongoSchema.Types.ObjectId): Promise<{ deletedCount: number }> {
        return this.eventModel.deleteOne({ _id: id }).exec();
    }
}
