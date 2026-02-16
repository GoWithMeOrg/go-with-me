import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { PermissionSchema } from './entities/permission.entity';
import { ResourceSchema } from '../resource/entities/resource.entity';
import { RoleSchema } from '../role/entities/role.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Permission', schema: PermissionSchema },
            { name: 'Resource', schema: ResourceSchema },
            { name: 'Role', schema: RoleSchema },
        ]),
    ],
    providers: [PermissionResolver, PermissionService],
    exports: [PermissionService],
})
export class PermissionModule {}
