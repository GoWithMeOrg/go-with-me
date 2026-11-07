import { Module, forwardRef } from '@nestjs/common';
import { ResourceService } from './resource.service.js';
import { ResourceResolver } from './resource.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourceSchema } from './entities/resource.entity.js';
import { PermissionModule } from '../permission/permission.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Resource', schema: ResourceSchema }]),
        forwardRef(() => PermissionModule),
    ],
    providers: [ResourceResolver, ResourceService],
    exports: [ResourceService],
})
export class ResourceModule {}
