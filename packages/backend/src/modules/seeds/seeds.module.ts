import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service.js';
import { SeedsResolver } from './seeds.resolver.js';
import { UserModule } from '../user/user.module.js';
import { LocationModule } from '../location/location.module.js';
import { CategoryModule } from '../category/category.module.js';
import { InterestModule } from '../interest/interest.module.js';
import { TagModule } from '../tag/tag.module.js';
import { EventModule } from '../event/event.module.js';

@Module({
    imports: [UserModule, LocationModule, CategoryModule, InterestModule, TagModule, EventModule],
    providers: [SeedsResolver, SeedsService],
})
export class SeedsModule {}
