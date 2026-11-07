import { Module } from '@nestjs/common';
import { CompanionRequestService } from './companion-request.service.js';
import { CompanionRequestResolver } from './companion-request.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Companion, CompanionSchema } from '../companion/entities/companion.entity.js';
import { CompanionRequest, CompanionRequestSchema } from './entities/companion-request.entity.js';
import { PUB_SUB } from '@/common/constants/pub-sub.constants.js';
import { pubSub } from '@/common/pubsub/pubsub.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Companion.name, schema: CompanionSchema },
            { name: CompanionRequest.name, schema: CompanionRequestSchema },
        ]),
    ],
    providers: [
        CompanionRequestResolver,
        CompanionRequestService,
        {
            provide: PUB_SUB,
            useValue: pubSub,
        },
    ],
    exports: [CompanionRequestService, PUB_SUB],
})
export class CompanionRequestModule {}
