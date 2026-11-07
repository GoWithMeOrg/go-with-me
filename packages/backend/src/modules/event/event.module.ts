import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from '@/modules/event/event.service.js';
import { EventResolver } from '@/modules/event/event.resolver.js';
import { EventSchema } from '@/modules/event/entities/event.entity.js';
import { LocationModule } from '@/modules/location/location.module.js';
import { UserModule } from '@/modules/user/user.module.js';
import { CategoryModule } from '@/modules/category/category.module.js';
import { InterestModule } from '@/modules/interest/interest.module.js';
import { TagModule } from '@/modules/tag/tag.module.js';
import { EnrichEventHelper } from '@/modules/event/helpers/enrich-event.helper.js';
import { EventCrudService } from '@/modules/event/services/event-crud.service.js';
import { EventQueryService } from '@/modules/event/services/event-query.service.js';
import { EventRelationsService } from '@/modules/event/services/event-relations.service.js';

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
