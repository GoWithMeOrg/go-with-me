import { useCallback, useEffect, useState } from 'react';
import { CREATE_REPLY_MUTATION, REMOVE_COMMENT_MUTATION } from '@/app/graphql/mutations/comment';
import { GET_CHILDREN_COMMENTS_BY_PARRENT_ID } from '@/app/graphql/queries/comment';
import { Comment as CommentType, OwnerType } from '@/app/graphql/types';
import { useLazyQuery, useMutation } from '@apollo/client/react';

import { ReplyTo } from '../../types';

const INITIAL_LIMIT = 3;
const LOAD_MORE_LIMIT = 5;

export const useChildrenComments = (comment: CommentType) => {
    const [offset, setOffset] = useState(0);
    const [currentLimit, setCurrentLimit] = useState(INITIAL_LIMIT);
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);

    const [fetchComments, { loading: fetchLoading }] = useLazyQuery<{
        getChildrenCommentsByParrentId: CommentType[];
    }>(GET_CHILDREN_COMMENTS_BY_PARRENT_ID, {
        fetchPolicy: 'network-only',
    });

    const [createCommentReply, { loading: createLoading }] = useMutation<{
        createReply: CommentType;
    }>(CREATE_REPLY_MUTATION);
    const [removeComment, { loading: deleteLoading }] = useMutation(REMOVE_COMMENT_MUTATION);

    useEffect(() => {
        if (!comment._id || !comment.repliesCount) return;
        let cancelled = false;

        fetchComments({
            variables: { limit: INITIAL_LIMIT, offset: 0, parentId: comment._id },
        })
            .then(({ data }) => {
                if (cancelled) return;
                setReplies(data?.getChildrenCommentsByParrentId ?? []);
            })
            .catch((error) => {
                if (error?.name === 'AbortError' || cancelled) return;
            });

        return () => {
            cancelled = true;
        };
    }, [comment._id]);

    const onSaveCommentReply = useCallback(
        async (content: string) => {
            const result = await createCommentReply({
                variables: {
                    createCommentInput: {
                        content,
                        ownerId: comment.ownerId,
                        ownerType: OwnerType.Event,
                        parent: comment._id,
                    },
                },
            });
            const newReply = result.data?.createReply;
            if (newReply) setReplies((prev) => [...prev, newReply]);
        },
        [createCommentReply, comment._id, comment.ownerId]
    );

    const hasMore = replies.length === offset + currentLimit;

    const loadMore = async () => {
        const newOffset = offset + currentLimit;
        const { data } = await fetchComments({
            variables: { parentId: comment._id, offset: newOffset, limit: LOAD_MORE_LIMIT },
        });

        if (data?.getChildrenCommentsByParrentId) {
            setReplies((prev) => [...prev, ...data.getChildrenCommentsByParrentId]);
        }

        setOffset(newOffset);
        setCurrentLimit(LOAD_MORE_LIMIT);
    };

    const onDeleteComment = useCallback(
        async (commentId: string) => {
            await removeComment({ variables: { commentId } });
            setReplies((prev) => prev.filter((c) => c._id !== commentId));
        },
        [removeComment]
    );

    const onClickReplyButton = useCallback(() => {
        setReplyToState((prev) =>
            prev?.id === comment._id
                ? null
                : {
                      id: comment._id,
                      userName: `${comment.author.firstName} ${comment.author.lastName}`,
                  }
        );
    }, [comment._id, comment.author.firstName, comment.author.lastName]);

    const closeReplyForm = useCallback(() => setReplyToState(null), []);

    return {
        replies,
        onSaveCommentReply,
        onDeleteComment,
        loading: fetchLoading || createLoading || deleteLoading,
        replyToState,
        onClickReplyButton,
        closeReplyForm,
        loadMore,
        hasMore,
    };
};
