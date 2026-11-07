import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentSchema } from './entities/comment.entity.js';
import { CommentService } from './comment.service.js';
import { CommentResolver } from './comment.resolver.js';
import { UserModule } from '@/modules/user/user.module.js';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]), UserModule],
    providers: [CommentResolver, CommentService],
    exports: [CommentService],
})
export class CommentModule {}
