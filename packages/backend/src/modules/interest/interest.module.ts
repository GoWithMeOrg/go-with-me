import { Module } from '@nestjs/common';
import { InterestService } from './interest.service.js';
import { InterestResolver } from './interest.resolver.js';
import { InterestSchema } from './entities/interest.entity.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Interest', schema: InterestSchema }])],
    providers: [InterestResolver, InterestService],
    exports: [InterestService],
})
export class InterestModule {}
