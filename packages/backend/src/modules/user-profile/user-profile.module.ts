import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from 'src/modules/user/user.module';
import { LocationModule } from 'src/modules/location/location.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { InterestModule } from 'src/modules/interest/interest.module';
import { TagModule } from 'src/modules/tag/tag.module';

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
    exports: [UserProfileService], // если нужно вызывать сбор профиля из других модулей
})
export class UserProfileModule {}
