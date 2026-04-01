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

    // async createComment(
    //     author: MongoSchema.Types.ObjectId,
    //     createCommentInput: CreateCommentInput
    // ) {
    //     const createComment = new this.commentModel({
    //         author,
    //         ...createCommentInput,
    //     });
    //     return await createComment.save();
    // }

    async createComment(
        author: MongoSchema.Types.ObjectId,
        createCommentInput: CreateCommentInput
    ): Promise<Comment> {
        const comment = await this.commentModel.create({
            author,
            ...createCommentInput,
        });

        //Инкрементируем счётчик родителя если это ответ
        if (createCommentInput.parent) {
            await this.commentModel.findByIdAndUpdate(createCommentInput.parent, {
                $inc: { repliesCount: 1 },
            });
        }

        return comment;
    }

    async createReply(author: MongoSchema.Types.ObjectId, createCommentInput: CreateCommentInput) {
        const { parent: parentId } = createCommentInput;

        // Проверяем что parentId передан
        if (!parentId) {
            throw new BadRequestException('parentId обязателен для ответа');
        }

        // Проверяем что родительский комментарий существует
        const parentComment = await this.commentModel.findById(parentId);
        if (!parentComment) {
            throw new NotFoundException('Комментарий не найден');
        }

        // Защита от вложенных ответов
        // if (parentComment.parent) {
        //     throw new BadRequestException('Нельзя отвечать на ответ');
        // }

        const [reply] = await Promise.all([
            this.commentModel.create({ author, ...createCommentInput }),
            this.commentModel.findByIdAndUpdate(parentId, { $inc: { repliesCount: 1 } }),
        ]);

        return reply;
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

    async getCommentsByOwnerId(
        ownerId: MongoSchema.Types.ObjectId,
        limit: number,
        offset: number
    ): Promise<Comment[]> {
        return this.commentModel
            .find({ ownerId })
            .populate('parent')
            .sort({ createdAt: 1 })
            .skip(offset)
            .limit(limit)
            .lean()
            .exec();
    }

    async getParrentCommentsByOwnerId(
        ownerId: MongoSchema.Types.ObjectId,
        limit?: number,
        offset?: number
    ): Promise<Comment[]> {
        return this.commentModel
            .find({ ownerId, parent: null })
            .sort({ createdAt: 1 })
            .skip(offset || 0)
            .limit(limit || 0)
            .lean()
            .exec();
    }

    async findById(id: MongoSchema.Types.ObjectId): Promise<Comment | null> {
        return this.commentModel.findById(id).populate('parent').lean().exec();
    }

    async getChildrenCommentsByParrentId(
        parentId: MongoSchema.Types.ObjectId,
        limit?: number,
        offset?: number
    ): Promise<Comment[]> {
        return this.commentModel
            .find({ parent: parentId })
            .sort({ createdAt: 1 })
            .skip(offset || 0)
            .limit(limit || 0)
            .lean()
            .exec();
    }

    async removeComment(
        commentId: MongoSchema.Types.ObjectId,
        userId: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new NotFoundException('Комментарий не найден');
        }

        // Проверка авторства
        if (comment.author.toString() !== userId.toString()) {
            throw new BadRequestException('Только автор может удалить свой комментарий');
        }

        // Уменьшаем repliesCount у родителя если это дочерний комментарий
        if (comment.parent) {
            await this.commentModel.findByIdAndUpdate(comment.parent, {
                $inc: { repliesCount: -1 },
            });
        }

        const result = await this.commentModel.findOneAndDelete({ _id: commentId });
        return !!result;
    }
}
