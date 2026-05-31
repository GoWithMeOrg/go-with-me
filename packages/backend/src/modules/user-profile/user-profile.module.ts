import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '@/modules/user/user.module';
import { LocationModule } from '@/modules/location/location.module';
import { CategoryModule } from '@/modules/category/category.module';
import { InterestModule } from '@/modules/interest/interest.module';
import { TagModule } from '@/modules/tag/tag.module';

import { UserProfileResolver } from './user-profile.resolver';

import { UserProfileService } from './user-profile.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => LocationModule),
        forwardRef(() => CategoryModule),
        forwardRef(() => InterestModule),
        forwardRef(() => TagModule),
    ],
    providers: [UserProfileResolver, UserProfileService],
    exports: [UserProfileService],
})
export class UserProfileModule {}
