import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Resolver(() => Comment)
export class CommentResolver {
    constructor(private readonly commentService: CommentService) {}

    @Mutation(() => Comment)
    createComment(
        @Args('createCommentInput') createCommentInput: CreateCommentInput,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return this.commentService.createComment(user._id, createCommentInput);
    }

    @Mutation(() => Comment)
    async createReply(
        @Args('createCommentInput') createCommentInput: CreateCommentInput,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return this.commentService.createReply(user._id, createCommentInput);
    }

    @Mutation(() => Comment)
    async updateComment(
        @Args('commentId', { type: () => ID }) commentId: MongoSchema.Types.ObjectId,
        @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return this.commentService.updateComment(commentId, updateCommentInput, user._id);
    }

    @Query(() => [Comment])
    async getCommentsByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId
    ): Promise<Comment[]> {
        return this.commentService.getCommentsByOwnerId(ownerId);
    }
}
