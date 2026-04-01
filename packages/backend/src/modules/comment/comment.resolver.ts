import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent, Int } from '@nestjs/graphql';
import { Schema as MongoSchema } from 'mongoose';

import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

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

    @Mutation(() => Boolean)
    async removeComment(
        @Args('commentId', { type: () => ID }) commentId: MongoSchema.Types.ObjectId,
        @CurrentUser() user: User
    ): Promise<boolean> {
        return this.commentService.removeComment(commentId, user._id);
    }

    @Query(() => [Comment])
    async getCommentsByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId,
        @Args('limit', { type: () => Int }) limit: number,
        @Args('offset', { type: () => Int }) offset: number
    ): Promise<Comment[]> {
        return this.commentService.getCommentsByOwnerId(ownerId, limit, offset);
    }

    @Query(() => [Comment])
    async getParrentCommentsByOwnerId(
        @Args('ownerId', { type: () => ID }) ownerId: MongoSchema.Types.ObjectId,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
        @Args('offset', { type: () => Int, nullable: true }) offset?: number
    ): Promise<Comment[]> {
        return this.commentService.getParrentCommentsByOwnerId(ownerId, limit, offset);
    }

    @Query(() => [Comment])
    async getChildrenCommentsByParrentId(
        @Args('parentId', { type: () => ID }) parentId: MongoSchema.Types.ObjectId,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number,
        @Args('offset', { type: () => Int, nullable: true }) offset?: number
    ): Promise<Comment[]> {
        return this.commentService.getChildrenCommentsByParrentId(parentId, limit, offset);
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

        const parentComment = await this.commentService.findById(
            comment.parent as MongoSchema.Types.ObjectId
        );
        return parentComment as Comment;
    }
}
