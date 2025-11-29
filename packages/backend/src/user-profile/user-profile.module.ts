import { forwardRef, Module } from '@nestjs/common';
import { LocationModule } from 'src/location/location.module';
import { UserModule } from 'src/user/user.module';
import { UserProfileResolver } from './user-profile.resolver';
import { UserProfileService } from './user-profile.service';

@Module({
    imports: [forwardRef(() => UserModule), forwardRef(() => LocationModule)],
    providers: [UserProfileResolver, UserProfileService],
    exports: [UserProfileService], // если нужно вызывать сбор профиля из других модулей
})
export class UserProfileModule {}
