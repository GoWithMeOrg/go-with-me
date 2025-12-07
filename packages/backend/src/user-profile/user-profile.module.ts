import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import { LocationModule } from 'src/location/location.module';
import { CategoryModule } from 'src/category/category.module';
import { InterestModule } from 'src/interest/interest.module';
import { TagModule } from 'src/tag/tag.module';

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
