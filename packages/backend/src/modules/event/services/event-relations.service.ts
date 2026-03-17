import { Injectable } from '@nestjs/common';
import { Schema as MongoSchema } from 'mongoose';

import { Event } from '../entities/event.entity';
import { LocationService } from '../../location/location.service';
import { CategoryService } from '../../category/category.service';
import { InterestService } from '../../interest/interest.service';
import { TagService } from '../../tag/tag.service';
import { EventRelationsInput } from '../interfaces/create-event-relations.input';

@Injectable()
export class EventRelationsService {
    constructor(
        private readonly locationService: LocationService,
        private readonly categoryService: CategoryService,
        private readonly interestService: InterestService,
        private readonly tagService: TagService
    ) {}

    async createRelations(
        event: Event & { _id: MongoSchema.Types.ObjectId },
        input: EventRelationsInput
    ): Promise<void> {
        const eventId = event._id;
        const updates: Partial<Event> = {};

        if (input.location) {
            updates.location = await this.locationService.createLocation({
                ...input.location,
                properties: {
                    ...input.location.properties,
                    ownerId: eventId,
                    ownerType: 'Event',
                },
            });
        }

        if (input.category) {
            updates.category = await this.categoryService.createCategories({
                ...input.category,
                ownerId: eventId,
                ownerType: 'Event',
            });
        }

        if (input.interest) {
            updates.interest = await this.interestService.createInterest({
                ...input.interest,
                ownerId: eventId,
                ownerType: 'Event',
            });
        }

        if (input.tag) {
            updates.tag = await this.tagService.createTag({
                ...input.tag,
                ownerId: eventId,
                ownerType: 'Event',
            });
        }

        // одно сохранение вместо четырёх
        if (Object.keys(updates).length > 0) {
            Object.assign(event, updates);
            await (event as any).save();
        }
    }
}
