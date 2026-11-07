import { CreateEventInput } from '@/modules/event/dto/create-event.input.js';
import { Event } from '@/modules/event/entities/event.entity.js';
import {
    EnrichEventHelper,
    EventWithRelations,
} from '@/modules/event/helpers/enrich-event.helper.js';
import { EventRelationsInput } from '@/modules/event/interfaces/create-event-relations.input.js';
import { EventCrudService } from '@/modules/event/services/event-crud.service.js';
import { EventQueryService } from '@/modules/event/services/event-query.service.js';
import { EventRelationsService } from '@/modules/event/services/event-relations.service.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class EventService {
    constructor(
        private readonly crudService: EventCrudService,
        private readonly queryService: EventQueryService,
        private readonly relationsService: EventRelationsService,
        private readonly enrichEvent: EnrichEventHelper
    ) {}

    async createEvent(
        organizer: Types.ObjectId,
        createEventInput: CreateEventInput,
        relations?: EventRelationsInput
    ): Promise<Event> {
        const event = await this.crudService.create(organizer, createEventInput);

        if (relations) {
            await this.relationsService.createRelations(event, relations);
        }

        return event;
    }

    async getAllEvents(
        limit?: number,
        offset?: number,
        sort?: string
    ): Promise<EventWithRelations[]> {
        const events = await this.queryService.findUpcoming(limit, offset, sort);
        return this.enrichEvent.enrichEventsWithRelations(events);
    }

    async getEventById(event_id: Types.ObjectId): Promise<EventWithRelations> {
        const event = await this.crudService.findById(event_id);

        if (!event) {
            throw new NotFoundException(`Event ${event_id} not found`);
        }

        return this.enrichEvent.enrichEventWithRelations(event);
    }

    async getEventsByOrganizer(organizer_id: Types.ObjectId): Promise<EventWithRelations[]> {
        const events = await this.crudService.findByOrganizer(organizer_id);
        return this.enrichEvent.enrichEventsWithRelations(events);
    }

    async updateEvent(
        event_id: Types.ObjectId,
        updateEventInput: Partial<CreateEventInput>,
        relations?: EventRelationsInput
    ): Promise<Event | null> {
        const event = await this.crudService.update(event_id, updateEventInput);

        if (relations && event) {
            await this.relationsService.updateRelations(event, relations);
        }

        return event;
    }

    async removeEvent(event_id: Types.ObjectId): Promise<boolean> {
        await this.relationsService.deleteRelations(event_id);
        const result = await this.crudService.delete(event_id);
        return result.deletedCount > 0;
    }
}
