import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Schema as MongoSchema } from 'mongoose';

import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async createComment(
        author: MongoSchema.Types.ObjectId,
        createCommentInput: CreateCommentInput
    ): Promise<Comment> {
        const comment = await this.commentModel.create({
            author,
            ...createCommentInput,
        });

        if (createCommentInput.parent) {
            let parentId: MongoSchema.Types.ObjectId | null = createCommentInput.parent;

            while (parentId) {
                await this.commentModel.findByIdAndUpdate(parentId, {
                    $inc: { repliesCount: 1 },
                });

                const parent = await this.commentModel.findById(parentId).select('parent');
                parentId = (parent?.parent as MongoSchema.Types.ObjectId | null) ?? null;
            }
        }

        return comment;
    }

    async createReply(author: MongoSchema.Types.ObjectId, createCommentInput: CreateCommentInput) {
        const { parent: parentId } = createCommentInput;

        if (!parentId) {
            throw new BadRequestException('parentId обязателен для ответа');
        }

        // const parentComment = await this.commentModel.findById(parentId);
        const parentComment = await this.commentModel
            .findById(parentId)
            .select('author parent')
            .lean();

        if (!parentComment) {
            throw new BadRequestException('Комментарий не найден');
        }

        if (parentComment.author.toString() === author.toString()) {
            throw new BadRequestException('Нельзя отвечать на собственный комментарий');
        }

        const reply = await this.commentModel.create({ author, ...createCommentInput });

        let currentParentId: MongoSchema.Types.ObjectId | null =
            parentId as MongoSchema.Types.ObjectId;

        while (currentParentId) {
            await this.commentModel.findByIdAndUpdate(currentParentId, {
                $inc: { repliesCount: 1 },
            });

            const parent = await this.commentModel.findById(currentParentId).select('parent');
            currentParentId = (parent?.parent as MongoSchema.Types.ObjectId | null) ?? null;
        }

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
        // Собираем всех потомков рекурсивно
        const allDescendants: Comment[] = [];
        const queue: MongoSchema.Types.ObjectId[] = [parentId];

        while (queue.length > 0) {
            const currentParentId = queue.shift();
            const children = await this.commentModel
                .find({ parent: currentParentId })
                .sort({ createdAt: 1 })
                .lean()
                .exec();

            for (const child of children) {
                allDescendants.push(child);
                queue.push(child._id as MongoSchema.Types.ObjectId);
            }
        }

        // Применяем пагинацию к плоскому списку
        return allDescendants.slice(offset || 0, (offset || 0) + (limit || allDescendants.length));
    }

    async removeComment(
        commentId: MongoSchema.Types.ObjectId,
        userId: MongoSchema.Types.ObjectId
    ): Promise<boolean> {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new NotFoundException('Комментарий не найден');
        }

        if (comment.author.toString() !== userId.toString()) {
            throw new BadRequestException('Только автор может удалить свой комментарий');
        }

        // Soft delete — только помечаем, счётчик предков не трогаем
        const result = await this.commentModel.findByIdAndUpdate(
            commentId,
            {
                $set: {
                    deleted: true,
                    content: '',
                },
            },
            { new: true }
        );

        return !!result;
    }
}
