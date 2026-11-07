import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PermissionService } from './permission.service.js';
import { PermissionResolver } from './permission.resolver.js';
import { PermissionSchema } from './entities/permission.entity.js';
import { ResourceSchema } from '../resource/entities/resource.entity.js';
import { RoleSchema } from '../role/entities/role.entity.js';

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
