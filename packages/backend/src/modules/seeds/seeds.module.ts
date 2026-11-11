import { Module } from '@nestjs/common';

import { CategoryModule } from '@/modules/category/category.module.js';
import { EventModule } from '@/modules/event/event.module.js';
import { InterestModule } from '@/modules/interest/interest.module.js';
import { LocationModule } from '@/modules/location/location.module.js';
import { SeedsResolver } from '@/modules/seeds/seeds.resolver.js';
import { SeedsService } from '@/modules/seeds/seeds.service.js';
import { TagModule } from '@/modules/tag/tag.module.js';
import { UserModule } from '@/modules/user/user.module.js';

@Module({
    imports: [UserModule, LocationModule, CategoryModule, InterestModule, TagModule, EventModule],
    providers: [SeedsResolver, SeedsService],
})
export class SeedsModule {}
