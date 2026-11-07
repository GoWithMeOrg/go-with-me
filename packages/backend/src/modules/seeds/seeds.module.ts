import { Module } from '@nestjs/common';
import { SeedsService } from '@/modules/seeds/seeds.service.js';
import { SeedsResolver } from '@/modules/seeds/seeds.resolver.js';
import { UserModule } from '@/modules/user/user.module.js';
import { LocationModule } from '@/modules/location/location.module.js';
import { CategoryModule } from '@/modules/category/category.module.js';
import { InterestModule } from '@/modules/interest/interest.module.js';
import { TagModule } from '@/modules/tag/tag.module.js';
import { EventModule } from '@/modules/event/event.module.js';

@Module({
    imports: [UserModule, LocationModule, CategoryModule, InterestModule, TagModule, EventModule],
    providers: [SeedsResolver, SeedsService],
})
export class SeedsModule {}
