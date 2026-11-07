import { Module } from '@nestjs/common';
import { TagService } from './tag.service.js';
import { TagResolver } from './tag.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './entities/tag.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }])],
    providers: [TagResolver, TagService],
    exports: [TagService],
})
export class TagModule {}
