import { Module } from '@nestjs/common';
import { TagService } from '@/modules/tag/tag.service.js';
import { TagResolver } from '@/modules/tag/tag.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from '@/modules/tag/entities/tag.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }])],
    providers: [TagResolver, TagService],
    exports: [TagService],
})
export class TagModule {}
