import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LikeSchema } from '@/modules/like/entities/like.entity.js';
import { LikeResolver } from '@/modules/like/like.resolver.js';
import { LikeService } from '@/modules/like/like.service.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }])],
    providers: [LikeResolver, LikeService],
    exports: [LikeService],
})
export class LikeModule {}
