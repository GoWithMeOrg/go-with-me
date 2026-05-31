import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Schema as MongoSchema } from 'mongoose';

import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';

const MAX_REPLY_DEPTH = 10;

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async createComment(
        author: MongoSchema.Types.ObjectId,
        createCommentInput: CreateCommentInput
    ): Promise<Comment> {
        if (createCommentInput.parent) {
            const parentExists = await this.commentModel.exists({ _id: createCommentInput.parent });
            if (!parentExists) {
                throw new BadRequestException('Родительский комментарий не найден');
            }
        }

        const comment = await this.commentModel.create({
            author,
            ...createCommentInput,
        });

        await this.incrementAncestorsRepliesCount(createCommentInput.parent);

        return comment;
    }

    async createReply(
        author: MongoSchema.Types.ObjectId,
        createCommentInput: CreateCommentInput
    ): Promise<Comment> {
        const { parent: parentId } = createCommentInput;

        if (!parentId) {
            throw new BadRequestException('parentId обязателен для ответа');
        }

        const parentComment = await this.commentModel
            .findById(parentId)
            .select('author parent')
            .lean();

        if (!parentComment) {
            throw new BadRequestException('Родительский комментарий не найден');
        }

        if (parentComment.author.toString() === author.toString()) {
            throw new BadRequestException('Нельзя отвечать на собственный комментарий');
        }

        const reply = await this.commentModel.create({ author, ...createCommentInput });

        await this.incrementAncestorsRepliesCount(parentId);

        return reply;
    }

    private async incrementAncestorsRepliesCount(
        parentId: MongoSchema.Types.ObjectId | null | undefined
    ): Promise<void> {
        let currentParentId: MongoSchema.Types.ObjectId | null = parentId ?? null;

        while (currentParentId) {
            await this.commentModel.findByIdAndUpdate(currentParentId, {
                $inc: { repliesCount: 1 },
            });

            const parent = await this.commentModel
                .findById(currentParentId)
                .select('parent')
                .lean();
            currentParentId = (parent?.parent as MongoSchema.Types.ObjectId | null) ?? null;
        }
    }

    private async decrementAncestorsRepliesCount(
        parentId: MongoSchema.Types.ObjectId
    ): Promise<void> {
        let currentParentId: MongoSchema.Types.ObjectId | null = parentId;

        while (currentParentId) {
            await this.commentModel.findByIdAndUpdate(currentParentId, {
                $inc: { repliesCount: -1 },
            });

            const parent = await this.commentModel
                .findById(currentParentId)
                .select('parent')
                .lean();
            currentParentId = (parent?.parent as MongoSchema.Types.ObjectId | null) ?? null;
        }
    }

    async updateComment(
        commentId: MongoSchema.Types.ObjectId,
        updateCommentInput: UpdateCommentInput,
        userId: MongoSchema.Types.ObjectId
    ): Promise<Comment> {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new NotFoundException('Комментарий не найден');
        }

        if (comment.author.toString() !== userId.toString()) {
            throw new BadRequestException('Только автор может редактировать свой комментарий');
        }

        const updatedComment = await this.commentModel.findByIdAndUpdate(
            commentId,
            updateCommentInput,
            { new: true }
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

    async getParentCommentsByOwnerId(
        ownerId: MongoSchema.Types.ObjectId,
        limit = 20,
        offset = 0,
        sort: 1 | -1 = 1
    ): Promise<Comment[]> {
        return this.commentModel
            .find({ ownerId, parent: null })
            .sort({ createdAt: sort })
            .skip(offset)
            .limit(limit)
            .lean()
            .exec();
    }

    async findById(id: MongoSchema.Types.ObjectId): Promise<Comment | null> {
        return this.commentModel.findById(id).populate('parent').lean<Comment>().exec();
    }

    async getChildrenCommentsByParentId(
        parentId: MongoSchema.Types.ObjectId,
        limit = 50,
        offset = 0,
        sort: 1 | -1 = 1
    ): Promise<Comment[]> {
        const allDescendants: Comment[] = [];
        const queue: { id: MongoSchema.Types.ObjectId; depth: number }[] = [
            { id: parentId, depth: 0 },
        ];

        while (queue.length > 0) {
            const { id: currentParentId, depth } = queue.shift()!;

            if (depth >= MAX_REPLY_DEPTH) continue;

            const children = await this.commentModel
                .find({ parent: currentParentId })
                .sort({ createdAt: sort })
                .lean()
                .exec();

            for (const child of children) {
                allDescendants.push(child);
                queue.push({ id: child._id as MongoSchema.Types.ObjectId, depth: depth + 1 });
            }
        }

        allDescendants.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sort === -1 ? dateB - dateA : dateA - dateB;
        });

        return allDescendants.slice(offset, offset + limit);
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

        if (comment.parent) {
            await this.decrementAncestorsRepliesCount(
                comment.parent as MongoSchema.Types.ObjectId
            );
        }

        const result = await this.commentModel.findByIdAndUpdate(
            commentId,
            { $set: { deleted: true, content: '' } },
            { new: true }
        );

        return !!result;
    }
}
