import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompanionRequestModule } from '@/modules/companion-request/companion-request.module.js';
import { CompanionModule } from '@/modules/companion/companion.module.js';
import { LocationModule } from '@/modules/location/location.module.js';
import { RoleSchema } from '@/modules/role/entities/role.entity.js';
import { UserSchema } from '@/modules/user/entities/user.entity.js';
import { UserResolver } from '@/modules/user/user.resolver.js';
import { UserService } from '@/modules/user/user.service.js';

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
