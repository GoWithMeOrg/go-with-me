import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Schema as MongoSchema } from 'mongoose';

import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name)
        private commentModel: Model<CommentDocument>
    ) {}

    async createComment(
        author: MongoSchema.Types.ObjectId,
        createCommentInput: CreateCommentInput
    ) {
        const createComment = new this.commentModel({
            author,
            ...createCommentInput,
        });
        return await createComment.save();
    }

    async createReply(author: MongoSchema.Types.ObjectId, createCommentInput: CreateCommentInput) {
        const { parentId } = createCommentInput;

        // Проверяем что parentId передан
        if (!parentId) {
            throw new BadRequestException('parentId обязателен для ответа');
        }

        // Проверяем что родительский комментарий существует
        const parent = await this.commentModel.findById(parentId);
        if (!parent) {
            throw new NotFoundException('Комментарий не найден');
        }

        // Защита от вложенных ответов
        if (parent.parentId) {
            throw new BadRequestException('Нельзя отвечать на ответ');
        }

        const reply = new this.commentModel({
            author,
            ...createCommentInput,
        });

        return await reply.save();
    }

    async updateComment(
        commentId: MongoSchema.Types.ObjectId,
        updateCommentInput: UpdateCommentInput,
        userId: MongoSchema.Types.ObjectId
    ) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new NotFoundException('Комментарий не найден');
        }

        // Проверка авторства
        if (comment.author.toString() !== userId.toString()) {
            throw new BadRequestException('Только автор может редактировать свой комментарий');
        }

        const updatedComment = await this.commentModel.findByIdAndUpdate(
            commentId,
            updateCommentInput,
            {
                new: true,
            }
        );

        if (!updatedComment) {
            throw new NotFoundException('Комментарий не найден');
        }

        return updatedComment;
    }

    async getCommentsByOwnerId(ownerId: MongoSchema.Types.ObjectId) {
        return this.commentModel.find({ ownerId }).exec();
    }
}
