import { Module } from '@nestjs/common';
import { LocationService } from '@/modules/location/location.service.js';
import { LocationResolver } from '@/modules/location/location.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from '@/modules/location/entities/location.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }])],
    providers: [LocationResolver, LocationService],
    exports: [LocationService, MongooseModule],
})
export class LocationModule {}
