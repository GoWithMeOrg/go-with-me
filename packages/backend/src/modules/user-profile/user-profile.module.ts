import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '@/modules/user/user.module.js';
import { LocationModule } from '@/modules/location/location.module.js';
import { CategoryModule } from '@/modules/category/category.module.js';
import { InterestModule } from '@/modules/interest/interest.module.js';
import { TagModule } from '@/modules/tag/tag.module.js';

import { UserProfileResolver } from './user-profile.resolver.js';

import { UserProfileService } from './user-profile.service.js';

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
