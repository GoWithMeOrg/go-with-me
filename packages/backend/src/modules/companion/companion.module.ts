import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
    CompanionRequest,
    CompanionRequestSchema,
} from '@/modules/companion-request/entities/companion-request.entity.js';
import { CompanionResolver } from '@/modules/companion/companion.resolver.js';
import { CompanionService } from '@/modules/companion/companion.service.js';
import { Companion, CompanionSchema } from '@/modules/companion/entities/companion.entity.js';
import { User, UserSchema } from '@/modules/user/entities/user.entity.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Companion.name, schema: CompanionSchema },
            { name: CompanionRequest.name, schema: CompanionRequestSchema },
        ]),
    ],
    providers: [CompanionResolver, CompanionService],
    exports: [CompanionService, MongooseModule],
})
export class CompanionModule {}
