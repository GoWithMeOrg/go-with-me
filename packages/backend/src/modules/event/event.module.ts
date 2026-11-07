import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './event.service.js';
import { EventResolver } from './event.resolver.js';
import { EventSchema } from './entities/event.entity.js';
import { LocationModule } from '../location/location.module.js';
import { UserModule } from '../user/user.module.js';
import { CategoryModule } from '../category/category.module.js';
import { InterestModule } from '../interest/interest.module.js';
import { TagModule } from '../tag/tag.module.js';
import { EnrichEventHelper } from './helpers/enrich-event.helper.js';
import { EventCrudService } from './services/event-crud.service.js';
import { EventQueryService } from './services/event-query.service.js';
import { EventRelationsService } from './services/event-relations.service.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
        LocationModule,
        UserModule,
        CategoryModule,
        InterestModule,
        TagModule,
    ],
    providers: [
        EventResolver,
        EventService,
        EnrichEventHelper,
        EventCrudService,
        EventQueryService,
        EventRelationsService,
    ],
    exports: [EventService, EventRelationsService, MongooseModule],
})
export class EventModule {}
