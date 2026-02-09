import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { PermissionSchema } from './entities/permission.entity';
import { ResourceModule } from '../resource/resource.module';
import { ResourceSchema } from '../resource/entities/resource.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Permission', schema: PermissionSchema }]),
        MongooseModule.forFeature([{ name: 'Resource', schema: ResourceSchema }]),
    ],
    providers: [PermissionResolver, PermissionService],
    exports: [PermissionService],
})
export class PermissionModule {}
