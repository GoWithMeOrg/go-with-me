import { PUB_SUB } from '@/common/constants/pub-sub.constants.js';
import { pubSub } from '@/common/pubsub/pubsub.js';
import { CompanionRequestResolver } from '@/modules/companion-request/companion-request.resolver.js';
import { CompanionRequestService } from '@/modules/companion-request/companion-request.service.js';
import {
    CompanionRequest,
    CompanionRequestSchema,
} from '@/modules/companion-request/entities/companion-request.entity.js';
import { Companion, CompanionSchema } from '@/modules/companion/entities/companion.entity.js';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
