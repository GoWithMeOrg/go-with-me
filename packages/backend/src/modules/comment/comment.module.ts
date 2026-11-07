import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentSchema } from '@/modules/comment/entities/comment.entity.js';
import { CommentService } from '@/modules/comment/comment.service.js';
import { CommentResolver } from '@/modules/comment/comment.resolver.js';
import { UserModule } from '@/modules/user/user.module.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]), UserModule],
    providers: [CommentResolver, CommentService],
    exports: [CommentService],
})
export class CommentModule {}
