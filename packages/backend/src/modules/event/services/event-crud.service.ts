import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateEventInput } from '@/modules/event/dto/create-event.input.js';
import { Event } from '@/modules/event/entities/event.entity.js';

@Injectable()
export class EventCrudService {
    constructor(
        @InjectModel(Event.name)
        private readonly eventModel: Model<Event>
    ) {}

    async create(organizer: Types.ObjectId, input: CreateEventInput): Promise<Event> {
        const event = new this.eventModel({ ...input, organizer });
        return event.save();
    }

    async update(
        event_id: Types.ObjectId,
        input: Partial<CreateEventInput>
    ): Promise<Event | null> {
        return this.eventModel.findByIdAndUpdate(event_id, input, { new: true }).exec();
    }

    async findById(id: Types.ObjectId): Promise<Event | null> {
        return this.eventModel.findById(id).exec();
    }

    async findByOrganizer(organizerId: Types.ObjectId): Promise<Event[]> {
        return this.eventModel.find({ organizer: organizerId }).exec();
    }

    async delete(id: Types.ObjectId): Promise<{ deletedCount: number }> {
        return this.eventModel.deleteOne({ _id: id }).exec();
    }
}
