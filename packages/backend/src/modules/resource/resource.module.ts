import { Module, forwardRef } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceResolver } from './resource.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ResourceSchema } from './entities/resource.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Resource', schema: ResourceSchema }]),
        forwardRef(() => PermissionModule),
    ],
    providers: [ResourceResolver, ResourceService],
    exports: [ResourceService],
})
export class ResourceModule {}
