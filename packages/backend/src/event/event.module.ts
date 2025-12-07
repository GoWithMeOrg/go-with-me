import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { EventSchema } from './entities/event.entity';
import { LocationModule } from '../location/location.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    LocationModule,
    UserModule,
  ],
  providers: [EventResolver, EventService],
  exports: [EventService, MongooseModule],
})
export class EventModule {}
