import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TagSchema } from '@/modules/tag/entities/tag.entity.js';
import { TagResolver } from '@/modules/tag/tag.resolver.js';
import { TagService } from '@/modules/tag/tag.service.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }])],
    providers: [TagResolver, TagService],
    exports: [TagService],
})
export class TagModule {}
