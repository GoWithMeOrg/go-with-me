import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsResolver } from './seeds.resolver';
import { UserModule } from '../user/user.module';
import { LocationModule } from '../location/location.module';
import { CategoryModule } from '../category/category.module';
import { InterestModule } from '../interest/interest.module';
import { TagModule } from '../tag/tag.module';
import { EventModule } from '../event/event.module';

@Module({
    imports: [UserModule, LocationModule, CategoryModule, InterestModule, TagModule, EventModule],
    providers: [SeedsResolver, SeedsService],
})
export class SeedsModule {}
