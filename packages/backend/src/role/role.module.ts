import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleSchema } from './entities/role.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
    providers: [RoleResolver, RoleService],
    exports: [RoleService],
})
export class RoleModule {}
