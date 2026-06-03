import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentSchema } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]), UserModule],
    providers: [CommentResolver, CommentService],
    exports: [CommentService],
})
export class CommentModule {}
