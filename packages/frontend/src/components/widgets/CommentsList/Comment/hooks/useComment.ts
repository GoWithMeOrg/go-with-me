import { useCallback, useState } from 'react';
import {
    CREATE_COMMENT_MUTATION,
    CREATE_REPLY_MUTATION,
    REMOVE_COMMENT_MUTATION,
} from '@/app/graphql/mutations/comment';
import { OwnerType, type Comment } from '@/app/graphql/types';
import { useMutation } from '@apollo/client/react';

import { ReplyTo } from '../../types';
import { withLoading } from '../helpers/withLoading';
import { useCommentReplies } from './useChildrenComments';

export const useComment = ({ owner_id, comment }: { owner_id?: string; comment?: Comment }) => {
    const [loading, setLoading] = useState(false);
    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);

    const { removeReply } = useCommentReplies(comment?._id ?? '');

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        refetchQueries: ['GetParrentCommentsByOwnerId'],
        awaitRefetchQueries: true,
    });

    const [createCommentReply] = useMutation(CREATE_REPLY_MUTATION, {
        refetchQueries: comment?._id ? ['GetChildrenCommentsByParrentId'] : [],
        awaitRefetchQueries: true,
    });

    const [removeComment] = useMutation(REMOVE_COMMENT_MUTATION, {
        refetchQueries: comment?._id
            ? ['GetChildrenCommentsByParrentId', 'GetParrentCommentsByOwnerId']
            : ['GetParrentCommentsByOwnerId'],
        awaitRefetchQueries: true,
    });

    const buildCommentInput = useCallback(
        (content: string, withParent = false) => ({
            content,
            ownerId: owner_id,
            ownerType: OwnerType.Event,
            ...(withParent && comment?._id ? { parent: comment._id } : {}),
        }),
        [owner_id, comment?._id]
    );

    const onSaveComment = useCallback(
        async (content: string) =>
            withLoading(setLoading, () =>
                createComment({
                    variables: { createCommentInput: buildCommentInput(content) },
                })
            )(),
        [createComment, buildCommentInput]
    );

    const onSaveCommentReply = useCallback(
        async (content: string) =>
            withLoading(setLoading, () =>
                createCommentReply({
                    variables: { createCommentInput: buildCommentInput(content, true) },
                })
            )(),
        [createCommentReply, buildCommentInput]
    );

    const onDeleteComment = useCallback(
        async (commentId: string) =>
            withLoading(setLoading, async () => {
                await removeComment({ variables: { commentId } });
                removeReply?.(commentId);
            })(),
        [removeComment, removeReply]
    );

    const onClickReplyButton = useCallback(() => {
        if (!comment?._id) return;

        setReplyToState((prev) =>
            prev?.id === comment._id
                ? null
                : {
                      id: comment._id,
                      userName: `${comment.author.firstName} ${comment.author.lastName}`,
                  }
        );
    }, [comment]);

    const closeReplyForm = useCallback(() => setReplyToState(null), []);

    return {
        onSaveComment,
        onSaveCommentReply,
        onDeleteComment,
        loading,
        replyToState,
        onClickReplyButton,
        closeReplyForm,
    };
};
