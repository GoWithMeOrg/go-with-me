import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventQueryService {
    constructor(
        @InjectModel(Event.name)
        private readonly eventModel: Model<Event>
    ) {}

    async findUpcoming(limit = 10, offset = 0, sort?: string): Promise<Event[]> {
        const sortOptions = this.buildSortOptions(sort);

        return this.eventModel
            .find({ startDate: { $gte: new Date() } })
            .sort(sortOptions)
            .skip(offset)
            .limit(limit)
            .exec();
    }

    private buildSortOptions(sort?: string): Record<string, 1 | -1> {
        if (!sort) return { startDate: -1 };

        const [field, order] = sort.split(':');
        return { [field]: order === 'desc' ? -1 : 1 };
    }
}
