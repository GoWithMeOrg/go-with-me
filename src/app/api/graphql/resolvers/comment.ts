import CommentModel, { IComment, INewComment } from "@/database/models/Comment";
import UserModel from "@/database/models/User";

export const commentResolvers = {
    Query: {
        comments: async (parent: any, { event_id, limit }: { event_id: string; limit?: number }) => {
            const comments = await CommentModel.find({ event_id }).populate("replies").populate("author");
            const firstLevelComments = comments.filter(({ replyTo }) => !replyTo).sort(() => -1);
            return firstLevelComments.slice(0, limit ?? firstLevelComments.length);
        },
    },

    Comment: {
        author: async (parent: IComment) => {
            return await UserModel.findById(parent.author_id);
        },
    },

    Mutation: {
        saveComment: async (parent: any, { comment }: { comment: INewComment }) => {
            const newComment = new CommentModel(comment);
            return await newComment.save();
        },

        updateComment: async (parent: any, { id, comment }: { id: string; comment: IComment }) => {
            await CommentModel.updateOne({ _id: id }, comment);
            return await CommentModel.findById(id);
        },
        deleteComment: async (parent: any, { commentId, userId }: { commentId: string; userId: string }) => {
            const currentComment = await CommentModel.findById(commentId);
            if (!currentComment) return "comment id not found";
            if (currentComment.author_id.toString() !== userId) return "author can't delete comment";
            const childrenDeleteResult = await CommentModel.deleteMany({ parentId: currentComment.id });
            await CommentModel.deleteOne({ _id: commentId });
            return `deleted comment id - ${commentId}, deleted children: ${childrenDeleteResult.deletedCount}`;
        },
        likeComment: async (parent: any, { commentId, userId }: { commentId: string; userId: string }) => {
            const comment = await CommentModel.findById(commentId);
            if (!comment) return;
            const { likes } = comment;
            const userLikeIndex = likes.findIndex((item) => {
                return item.toString() === userId;
            });
            if (userLikeIndex === -1) {
                likes.push(userId);
            } else {
                likes.splice(userLikeIndex, 1);
            }
            return await comment.save();
        },
    },
};
