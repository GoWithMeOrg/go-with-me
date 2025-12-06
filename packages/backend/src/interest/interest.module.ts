import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestResolver } from './interest.resolver';
import { InterestSchema } from './entities/interest.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Interest', schema: InterestSchema }])],
    providers: [InterestResolver, InterestService],
    exports: [InterestService],
})
export class InterestModule {}
