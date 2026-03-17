import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { EventSchema } from './entities/event.entity';
import { LocationModule } from '../location/location.module';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { InterestModule } from '../interest/interest.module';
import { TagModule } from '../tag/tag.module';
import { EnrichEventHelper } from './helpers/enrich-event.helper';
import { EventCrudService } from './services/event-crud.service';
import { EventQueryService } from './services/event-query.service';
import { EventRelationsService } from './services/event-relations.service';

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
    exports: [EventService, MongooseModule],
})
export class EventModule {}
