import { Injectable, NotFoundException } from '@nestjs/common';
import { Schema as MongoSchema } from 'mongoose';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { CreateEventRelationsInput } from './interfaces/create-event-relations.input';
import { EnrichEventHelper, EventWithRelations } from './helpers/enrich-event.helper';
import { EventCrudService } from './services/event-crud.service';
import { EventQueryService } from './services/event-query.service';
import { EventRelationsService } from './services/event-relations.service';

@Injectable()
export class EventService {
    constructor(
        private readonly crudService: EventCrudService,
        private readonly queryService: EventQueryService,
        private readonly relationsService: EventRelationsService,
        private readonly enrichEvent: EnrichEventHelper
    ) {}

    async createEvent(
        organizer: MongoSchema.Types.ObjectId,
        createEventInput: CreateEventInput,
        relations?: CreateEventRelationsInput
    ): Promise<Event> {
        const event = await this.crudService.create(organizer, createEventInput);

        if (relations) {
            await this.relationsService.attachRelations(event, relations);
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

    async getEventById(event_id: MongoSchema.Types.ObjectId): Promise<EventWithRelations> {
        const event = await this.crudService.findById(event_id);

        if (!event) {
            throw new NotFoundException(`Event ${event_id} not found`);
        }

        return this.enrichEvent.enrichEventWithRelations(event);
    }

    async getEventsByOrganizer(
        organizer_id: MongoSchema.Types.ObjectId
    ): Promise<EventWithRelations[]> {
        const events = await this.crudService.findByOrganizer(organizer_id);
        return this.enrichEvent.enrichEventsWithRelations(events);
    }

    async updateEvent(
        id: MongoSchema.Types.ObjectId,
        updateEventInput: Partial<CreateEventInput>
    ): Promise<Event | null> {
        return this.crudService.update(id, updateEventInput);
    }

    async removeEvent(id: MongoSchema.Types.ObjectId): Promise<{ deletedCount: number }> {
        return this.crudService.delete(id);
    }
}
