import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { Event } from '@/modules/event/entities/event.entity.js';
import { LocationService } from '@/modules/location/location.service.js';
import { CategoryService } from '@/modules/category/category.service.js';
import { InterestService } from '@/modules/interest/interest.service.js';
import { TagService } from '@/modules/tag/tag.service.js';
import { EventRelationsInput } from '@/modules/event/interfaces/create-event-relations.input.js';

@Injectable()
export class EventRelationsService {
    constructor(
        private readonly locationService: LocationService,
        private readonly categoryService: CategoryService,
        private readonly interestService: InterestService,
        private readonly tagService: TagService
    ) {}

    async createRelations(
        event: Event & { _id: Types.ObjectId },
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
            await (event as unknown as { save: () => Promise<unknown> }).save();
        }
    }

    async updateRelations(
        event: Event & { _id: Types.ObjectId },
        input: EventRelationsInput
    ): Promise<void> {
        const eventId = event._id;
        const updates: Partial<Event> = {};

        if (input.location) {
            const existingLocation = await this.locationService.getLocationByOwner(eventId);
            if (existingLocation?._id) {
                updates.location =
                    (await this.locationService.updateLocation(
                        existingLocation._id,
                        input.location
                    )) ?? undefined;
            }
        }

        if (input.category) {
            const existingCategory = await this.categoryService.getCategoriesByOwner(eventId);
            if (existingCategory?._id) {
                updates.category =
                    (await this.categoryService.updateCategories(
                        existingCategory._id,
                        input.category
                    )) ?? undefined;
            }
        }

        if (input.interest) {
            const existingInterest = await this.interestService.getInterestByOwner(eventId);
            if (existingInterest?._id) {
                updates.interest =
                    (await this.interestService.updateInterest(
                        existingInterest._id,
                        input.interest
                    )) ?? undefined;
            }
        }

        if (input.tag) {
            const existingTag = await this.tagService.getTagByOwner(eventId);
            if (existingTag?._id) {
                updates.tag =
                    (await this.tagService.updateTag(existingTag._id, input.tag)) ?? undefined;
            }
        }

        // одно сохранение вместо четырёх
        if (Object.keys(updates).length > 0) {
            Object.assign(event, updates);
            await (event as unknown as { save: () => Promise<unknown> }).save();
        }
    }

    async deleteRelations(eventId: Types.ObjectId): Promise<void> {
        const existingLocation = await this.locationService.getLocationByOwner(eventId);
        if (existingLocation?._id) {
            await this.locationService.removeLocation(existingLocation._id);
        }

        const existingCategory = await this.categoryService.getCategoriesByOwner(eventId);
        if (existingCategory?._id) {
            await this.categoryService.removeCategories(existingCategory._id);
        }

        const existingInterest = await this.interestService.getInterestByOwner(eventId);
        if (existingInterest?._id) {
            await this.interestService.removeInterest(existingInterest._id);
        }

        const existingTag = await this.tagService.getTagByOwner(eventId);
        if (existingTag?._id) {
            await this.tagService.removeTag(existingTag._id);
        }
    }
}
