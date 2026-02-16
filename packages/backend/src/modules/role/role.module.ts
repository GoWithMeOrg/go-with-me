import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleSchema } from './entities/role.entity';
import { UserSchema } from '../user/entities/user.entity';

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
