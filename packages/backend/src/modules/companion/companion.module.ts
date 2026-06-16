import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Companion, CompanionSchema } from './entities/companion.entity';
import { CompanionService } from './companion.service';
import { CompanionResolver } from './companion.resolver';
import {
    CompanionRequest,
    CompanionRequestSchema,
} from '../companion-request/entities/companion-request.entity';
import { User, UserSchema } from '../user/entities/user.entity';

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
