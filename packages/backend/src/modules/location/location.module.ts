import { Module } from '@nestjs/common';
import { LocationService } from './location.service.js';
import { LocationResolver } from './location.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from './entities/location.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }])],
    providers: [LocationResolver, LocationService],
    exports: [LocationService, MongooseModule],
})
export class LocationModule {}
