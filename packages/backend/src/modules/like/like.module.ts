import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeSchema } from './entities/like.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }])],
    providers: [LikeResolver, LikeService],
    exports: [LikeService],
})
export class LikeModule {}
