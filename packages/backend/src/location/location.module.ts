import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LocationSchema } from './entities/location.entity';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }])],
  providers: [LocationResolver, LocationService],
})
export class LocationModule {}
