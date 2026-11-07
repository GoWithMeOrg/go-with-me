import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Companion, CompanionSchema } from './entities/companion.entity.js';
import { CompanionService } from './companion.service.js';
import { CompanionResolver } from './companion.resolver.js';
import {
    CompanionRequest,
    CompanionRequestSchema,
} from '../companion-request/entities/companion-request.entity.js';
import { User, UserSchema } from '../user/entities/user.entity.js';

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
