import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { PermissionSchema } from './entities/permission.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Permission', schema: PermissionSchema }])],
    providers: [PermissionResolver, PermissionService],
    exports: [PermissionService],
})
export class PermissionModule {}
