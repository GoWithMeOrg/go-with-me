import { Module, forwardRef } from '@nestjs/common';
import { ResourceService } from '@/modules/resource/resource.service.js';
import { ResourceResolver } from '@/modules/resource/resource.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourceSchema } from '@/modules/resource/entities/resource.entity.js';
import { PermissionModule } from '@/modules/permission/permission.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Resource', schema: ResourceSchema }]),
        forwardRef(() => PermissionModule),
    ],
    providers: [ResourceResolver, ResourceService],
    exports: [ResourceService],
})
export class ResourceModule {}
