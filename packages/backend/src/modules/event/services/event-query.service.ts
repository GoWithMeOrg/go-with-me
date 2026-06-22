import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '../entities/event.entity';
import { Privacy } from '../enum/privacy.enum';
import { JoinService } from '@/modules/join/join.service';

@Injectable()
export class EventQueryService {
    constructor(
        @InjectModel(Event.name)
        private readonly eventModel: Model<Event>,
        private readonly joinService: JoinService,
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

    async findPopular(limit = 12): Promise<Event[]> {
        const counts = await this.joinService.getJoinCounts();

        counts.sort((a, b) => b.count - a.count);

        const topIds = counts.slice(0, limit).map((c) => c.ownerId);

        if (topIds.length === 0) return [];

        const now = new Date();
        const events = await this.eventModel
            .find({
                _id: { $in: topIds },
                privacy: Privacy.PUBLIC,
                $or: [
                    { endDate: { $gte: now } },
                    { endDate: null, startDate: { $gte: now } },
                ],
            });

        const eventMap = new Map(
            events.map((e) => [(e._id as Types.ObjectId).toString(), e]),
        );

        return topIds
            .map((id) => eventMap.get(id.toString()))
            .filter(Boolean) as Event[];
    }

    private buildSortOptions(sort?: string): Record<string, 1 | -1> {
        if (!sort) return { startDate: -1 };

        const [field, order] = sort.split(':');
        return { [field]: order === 'desc' ? -1 : 1 };
    }
}
