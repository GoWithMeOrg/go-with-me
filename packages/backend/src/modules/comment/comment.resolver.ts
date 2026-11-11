import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';

import { CurrentUser } from '@/common/decorators/current-user.decorator.js';
import { CommentService } from '@/modules/comment/comment.service.js';
import { CreateCommentInput } from '@/modules/comment/dto/create-comment.input.js';
import { UpdateCommentInput } from '@/modules/comment/dto/update-comment.input.js';
import { Comment } from '@/modules/comment/entities/comment.entity.js';
import { User } from '@/modules/user/entities/user.entity.js';
import { UserService } from '@/modules/user/user.service.js';

@Resolver(() => Comment)
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService,
        private readonly userService: UserService
    ) {}

    @Mutation(() => Comment)
    createComment(
        @Args('createCommentInput') createCommentInput: CreateCommentInput,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return this.commentService.createComment(user._id, createCommentInput);
    }

    @Mutation(() => Comment)
    createReply(
        @Args('createCommentInput') createCommentInput: CreateCommentInput,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return this.commentService.createReply(user._id, createCommentInput);
    }

    @Mutation(() => Comment)
    updateComment(
        @Args('commentId', { type: () => ID }) commentId: Types.ObjectId,
        @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
        @CurrentUser() user: User
    ): Promise<Comment> {
        return this.commentService.updateComment(commentId, updateCommentInput, user._id);
    }

    @Mutation(() => Boolean)
    removeComment(
        @Args('commentId', { type: () => ID }) commentId: Types.ObjectId,
        @CurrentUser() user: User
    ): Promise<boolean> {
        return this.commentService.removeComment(commentId, user._id);
    }

    @Query(() => [Comment])
    getCommentsByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: Types.ObjectId,
        @Args('limit', { type: () => Int }) limit: number,
        @Args('offset', { type: () => Int }) offset: number
    ): Promise<Comment[]> {
        return this.commentService.getCommentsByOwnerId(ownerId, limit, offset);
    }

    @Query(() => [Comment])
    getParentCommentsByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: Types.ObjectId,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
        @Args('offset', { type: () => Int, nullable: true }) offset?: number,
        @Args('sort', { type: () => String, nullable: true }) sort?: string
    ): Promise<Comment[]> {
        const sortDirection = sort === 'newest' ? -1 : 1;
        return this.commentService.getParentCommentsByOwnerId(
            ownerId,
            limit,
            offset,
            sortDirection
        );
    }

    @Query(() => [Comment])
    getChildrenCommentsByParentId(
        @Args('parentId', { type: () => ID }) parentId: Types.ObjectId,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
        @Args('offset', { type: () => Int, nullable: true }) offset?: number,
        @Args('sort', { type: () => String, nullable: true }) sort?: string
    ): Promise<Comment[]> {
        const sortDirection = sort === 'newest' ? -1 : 1;
        return this.commentService.getChildrenCommentsByParentId(
            parentId,
            limit,
            offset,
            sortDirection
        );
    }

    @ResolveField(() => User, { name: 'author' })
    async getAuthor(@Parent() comment: Comment): Promise<User> {
        const user = await this.userService.getUserById(comment.author);
        return user as User;
    }

    @ResolveField(() => Comment, { nullable: true })
    async parent(@Parent() comment: Comment): Promise<Comment | null> {
        if (!comment.parent) {
            return null;
        }

        const parentComment = await this.commentService.findById(comment.parent as Types.ObjectId);
        return parentComment as Comment;
    }
}
