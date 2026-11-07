import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleService } from './role.service.js';
import { RoleResolver } from './role.resolver.js';
import { RoleSchema } from './entities/role.entity.js';
import { UserSchema } from '../user/entities/user.entity.js';

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
