import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Companion, CompanionSchema } from './entities/companion.entity';
import { CompanionService } from './companion.service';
import { CompanionResolver } from './companion.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: Companion.name, schema: CompanionSchema }])],
    providers: [CompanionResolver, CompanionService],
    exports: [CompanionService],
})
export class CompanionModule {}
