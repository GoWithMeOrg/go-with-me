import { PermissionModule } from '@/modules/permission/permission.module.js';
import { ResourceSchema } from '@/modules/resource/entities/resource.entity.js';
import { ResourceResolver } from '@/modules/resource/resource.resolver.js';
import { ResourceService } from '@/modules/resource/resource.service.js';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Resource', schema: ResourceSchema }]),
        forwardRef(() => PermissionModule),
    ],
    providers: [ResourceResolver, ResourceService],
    exports: [ResourceService],
})
export class ResourceModule {}
