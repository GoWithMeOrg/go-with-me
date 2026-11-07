import { Module } from '@nestjs/common';
import { LikeService } from './like.service.js';
import { LikeResolver } from './like.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeSchema } from './entities/like.entity.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }])],
    providers: [LikeResolver, LikeService],
    exports: [LikeService],
})
export class LikeModule {}
