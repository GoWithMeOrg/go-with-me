import { CategoryModule } from '@/modules/category/category.module.js';
import { InterestModule } from '@/modules/interest/interest.module.js';
import { LocationModule } from '@/modules/location/location.module.js';
import { TagModule } from '@/modules/tag/tag.module.js';
import { UserProfileResolver } from '@/modules/user-profile/user-profile.resolver.js';
import { UserProfileService } from '@/modules/user-profile/user-profile.service.js';
import { UserModule } from '@/modules/user/user.module.js';
import { forwardRef, Module } from '@nestjs/common';

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
