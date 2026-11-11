import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleSchema } from '@/modules/role/entities/role.entity.js';
import { RoleResolver } from '@/modules/role/role.resolver.js';
import { RoleService } from '@/modules/role/role.service.js';
import { UserSchema } from '@/modules/user/entities/user.entity.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Role', schema: RoleSchema },
            { name: 'User', schema: UserSchema },
        ]),
    ],
    providers: [RoleResolver, RoleService],
    exports: [RoleService],
})
export class RoleModule {}
