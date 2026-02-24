import { Module } from '@nestjs/common';
import { CompanionRequestService } from './companion-request.service';
import { CompanionRequestResolver } from './companion-request.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Companion, CompanionSchema } from '../companion/entities/companion.entity';
import { CompanionRequest, CompanionRequestSchema } from './entities/companion-request.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Companion.name, schema: CompanionSchema },
            { name: CompanionRequest.name, schema: CompanionRequestSchema },
        ]),
    ],
    providers: [CompanionRequestResolver, CompanionRequestService],
    exports: [CompanionRequestService],
})
export class CompanionRequestModule {}
