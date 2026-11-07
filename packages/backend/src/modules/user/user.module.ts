import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service.js';
import { UserResolver } from './user.resolver.js';
import { UserSchema } from './entities/user.entity.js';
import { LocationModule } from '@/modules/location/location.module.js';
import { RoleSchema } from '../role/entities/role.entity.js';
import { CompanionModule } from '../companion/companion.module.js';
import { CompanionRequestModule } from '../companion-request/companion-request.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Role', schema: RoleSchema },
        ]),

        // Используем forwardRef для предотвращения циклической зависимости. Иначе gql сервер не работает
        forwardRef(() => LocationModule),
        CompanionModule,
        CompanionRequestModule,
    ],
    providers: [UserResolver, UserService],
    exports: [UserService, MongooseModule],
})
export class UserModule {}
