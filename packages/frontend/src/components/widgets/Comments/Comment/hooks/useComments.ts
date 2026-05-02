import { StringDecoder } from 'string_decoder';
import { useCallback, useEffect, useState } from 'react';
import {
    CREATE_COMMENT_MUTATION,
    CREATE_REPLY_MUTATION,
    REMOVE_COMMENT_MUTATION,
} from '@/app/graphql/mutations/comment';
import {
    GET_CHILDREN_COMMENTS_BY_PARENT_ID,
    GET_PARENT_COMMENTS_BY_OWNER_ID,
} from '@/app/graphql/queries/comment';
import { Comment as CommentType, OwnerType } from '@/app/graphql/types';
import { useLazyQuery, useMutation } from '@apollo/client/react';

import { ReplyTo } from '../../types';

const INITIAL_LIMIT = 3;
const LOAD_MORE_LIMIT = 5;

export const useComments = (ownerId?: string, comment?: CommentType) => {
    const [offset, setOffset] = useState(0);
    const [currentLimit, setCurrentLimit] = useState(INITIAL_LIMIT);
    const [comments, setComments] = useState<CommentType[]>([]);

    const [totalCount, setTotalCount] = useState(comment?.repliesCount ?? 0);
    const [loadedReplies, setLoadedReplies] = useState(false);
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);

    const [fetchComments, { loading: loadingFetchComments, error: errorFetchComments }] =
        useLazyQuery<{
            getParentCommentsByOwnerId: CommentType[];
        }>(GET_PARENT_COMMENTS_BY_OWNER_ID, {
            fetchPolicy: 'network-only',
        });

    const [fetchReplies, { loading: LoadingFetchReplies, error: errorFetchReplies }] =
        useLazyQuery<{
            getChildrenCommentsByParentId: CommentType[];
        }>(GET_CHILDREN_COMMENTS_BY_PARENT_ID, { fetchPolicy: 'network-only' });

    const [createComment] = useMutation<{ createComment: CommentType }>(CREATE_COMMENT_MUTATION);
    const [removeComment] = useMutation<{ removeComment: boolean }>(REMOVE_COMMENT_MUTATION);
    const [createReply] = useMutation<{ createReply: CommentType }>(CREATE_REPLY_MUTATION);

    useEffect(() => {
        let cancelled = false;

        fetchComments({ variables: { ownerId, limit: INITIAL_LIMIT, offset: 0 } })
            .then(({ data }) => {
                if (cancelled) return;
                setComments(data?.getParentCommentsByOwnerId ?? []);
            })
            .catch((error) => {
                if (error?.name === 'AbortError' || cancelled) return;
            });

        return () => {
            cancelled = true;
        };
    }, [ownerId]);

    const hasMoreComments = comments.length === offset + currentLimit;
    const hasMoreReplies = replies.length < totalCount;

    const loadMoreComments = async () => {
        const newOffset = offset + currentLimit;
        const { data } = await fetchComments({
            variables: { ownerId, offset: newOffset, limit: LOAD_MORE_LIMIT },
        });

        if (data?.getParentCommentsByOwnerId) {
            setComments((prev) => [...prev, ...data.getParentCommentsByOwnerId]);
        }

        setOffset(newOffset);
        setCurrentLimit(LOAD_MORE_LIMIT);
    };

    const loadMoreReplies = async () => {
        const { data } = await fetchReplies({
            variables: { parentId: comment?._id, offset: replies.length, limit: LOAD_MORE_LIMIT },
        });

        if (data?.getChildrenCommentsByParentId) {
            setReplies((prev) => [...prev, ...data?.getChildrenCommentsByParentId]);
            setLoadedReplies(true);
        }
    };

    const onSaveComment = useCallback(
        async (content: string) => {
            const result = await createComment({
                variables: {
                    createCommentInput: {
                        content,
                        ownerId,
                        ownerType: OwnerType.Event,
                    },
                },
            });

            const newComment = result.data?.createComment;

            if (newComment) setComments((prev) => [...prev, newComment]);
        },
        [createComment, ownerId]
    );

    const onSaveReply = useCallback(
        async (content: string) => {
            const result = await createReply({
                variables: {
                    createCommentInput: {
                        content,
                        ownerId: comment?.ownerId,
                        ownerType: OwnerType.Event,
                        parent: comment?._id,
                    },
                },
            });
            const newReply = result.data?.createReply;
            if (newReply) setReplies((prev) => [...prev, newReply]);
        },
        [createReply, comment?._id, comment?.ownerId]
    );

    const onDeleteComment = useCallback(
        async (commentId: string) => {
            try {
                await removeComment({ variables: { commentId } });
            } catch (error) {
                const isNotFound = error instanceof Error && error.message.includes('не найден');
                if (!isNotFound) throw error;
            }

            setComments((prev) =>
                prev.map((c) => (c._id === commentId ? { ...c, deleted: true, content: '' } : c))
            );
        },
        [removeComment]
    );

    const onDeleteReply = useCallback(
        async (commentId: string) => {
            try {
                await removeComment({ variables: { commentId } });
            } catch (error) {
                const isNotFound = error instanceof Error && error.message.includes('не найден');
                if (!isNotFound) throw error;
            }

            // Заменяем на заглушку, totalCount не трогаем
            setReplies((prev) =>
                prev.map((c) => (c._id === commentId ? { ...c, deleted: true, content: '' } : c))
            );
        },
        [removeComment]
    );

    const onClickReplyButton = useCallback(() => {
        if (!comment) return;
        setReplyToState((prev) =>
            prev?.id === comment?._id
                ? null
                : {
                      id: comment._id,
                      userName: `${comment?.author.firstName} ${comment?.author.lastName}`,
                  }
        );
    }, [comment?._id, comment?.author.firstName, comment?.author.lastName]);

    const closeReplyForm = useCallback(() => setReplyToState(null), []);

    return {
        comments,
        replies,
        loading: loadingFetchComments || LoadingFetchReplies,
        loadMoreComments,
        loadMoreReplies,
        hasMoreComments,
        hasMoreReplies,
        onSaveComment,
        onSaveReply,
        onDeleteComment,
        onDeleteReply,
        closeReplyForm,
        onClickReplyButton,
        replyToState,
        totalCount,
        loadedReplies,
    };
};
