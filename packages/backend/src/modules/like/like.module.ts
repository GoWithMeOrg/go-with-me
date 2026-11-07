import { Module } from '@nestjs/common';
import { LikeService } from '@/modules/like/like.service.js';
import { LikeResolver } from '@/modules/like/like.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeSchema } from '@/modules/like/entities/like.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }])],
    providers: [LikeResolver, LikeService],
    exports: [LikeService],
})
export class LikeModule {}
