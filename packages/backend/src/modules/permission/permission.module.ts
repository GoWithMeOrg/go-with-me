import { PermissionSchema } from '@/modules/permission/entities/permission.entity.js';
import { PermissionResolver } from '@/modules/permission/permission.resolver.js';
import { PermissionService } from '@/modules/permission/permission.service.js';
import { ResourceSchema } from '@/modules/resource/entities/resource.entity.js';
import { RoleSchema } from '@/modules/role/entities/role.entity.js';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
