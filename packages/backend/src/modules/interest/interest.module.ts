import { Module } from '@nestjs/common';
import { InterestService } from '@/modules/interest/interest.service.js';
import { InterestResolver } from '@/modules/interest/interest.resolver.js';
import { InterestSchema } from '@/modules/interest/entities/interest.entity.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Interest', schema: InterestSchema }])],
    providers: [InterestResolver, InterestService],
    exports: [InterestService],
})
export class InterestModule {}
