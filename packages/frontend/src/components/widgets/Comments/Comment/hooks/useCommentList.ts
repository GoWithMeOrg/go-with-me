import { useCallback, useEffect, useRef, useState } from 'react';
import {
    CREATE_COMMENT_MUTATION,
    REMOVE_COMMENT_MUTATION,
} from '@/app/graphql/mutations/comment';
import { GET_PARENT_COMMENTS_BY_OWNER_ID } from '@/app/graphql/queries/comment';
import { Comment as CommentType, OwnerType } from '@/app/graphql/types';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { buildOptimisticComment } from './commentUtils';

const INITIAL_LIMIT = 3;
const LOAD_MORE_LIMIT = 5;

export const useCommentList = (ownerId: string) => {
    const [offset, setOffset] = useState(0);
    const [currentLimit, setCurrentLimit] = useState(INITIAL_LIMIT);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [hasMoreComments, setHasMoreComments] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const commentsRef = useRef(comments);
    commentsRef.current = comments;

    const [fetchComments, { loading }] = useLazyQuery<{
        getParentCommentsByOwnerId: CommentType[];
    }>(GET_PARENT_COMMENTS_BY_OWNER_ID, { fetchPolicy: 'cache-and-network' });

    const [createComment] = useMutation<{ createComment: CommentType }>(CREATE_COMMENT_MUTATION);
    const [removeComment] = useMutation<{ removeComment: boolean }>(REMOVE_COMMENT_MUTATION);

    useEffect(() => {
        let cancelled = false;

        fetchComments({ variables: { sort: 'newest', ownerId, limit: INITIAL_LIMIT, offset: 0 } })
            .then(({ data }) => {
                if (cancelled) return;
                const result = data?.getParentCommentsByOwnerId ?? [];
                setComments(result);
                if (result.length < INITIAL_LIMIT) {
                    setHasMoreComments(false);
                } else {
                    setHasMoreComments(true);
                }
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err?.message ?? 'Failed to load comments');
            });

        return () => {
            cancelled = true;
        };
    }, [ownerId]);

    const loadMore = useCallback(async () => {
        const newOffset = offset + currentLimit;

        try {
            const { data } = await fetchComments({
                variables: { sort: 'newest', ownerId, offset: newOffset, limit: LOAD_MORE_LIMIT },
            });

            if (data?.getParentCommentsByOwnerId) {
                const batch = data.getParentCommentsByOwnerId;
                setComments((prev) => [...prev, ...batch]);
                if (batch.length < LOAD_MORE_LIMIT) {
                    setHasMoreComments(false);
                }
            }
            setOffset(newOffset);
            setCurrentLimit(LOAD_MORE_LIMIT);
        } catch (err: any) {
            setError(err?.message ?? 'Failed to load more comments');
        }
    }, [offset, currentLimit, fetchComments, ownerId]);

    const onSave = useCallback(
        async (content: string) => {
            const optimistic = buildOptimisticComment(content, ownerId);

            setComments((prev) => [optimistic, ...prev]);

            try {
                const result = await createComment({
                    variables: {
                        createCommentInput: { content, ownerId, ownerType: OwnerType.Event },
                    },
                });
                const newComment = result.data?.createComment;
                if (newComment) {
                    setComments((prev) =>
                        prev.map((c) => (c._id === optimistic._id ? newComment : c))
                    );
                }
            } catch {
                setComments((prev) => prev.filter((c) => c._id !== optimistic._id));
                setError('Failed to save comment');
            }
        },
        [createComment, ownerId]
    );

    const onDelete = useCallback(
        async (commentId: string) => {
            const prev = commentsRef.current.find((c) => c._id === commentId);

            setComments((prevComments) =>
                prevComments.map((c) => (c._id === commentId ? { ...c, deleted: true, content: '' } : c))
            );

            try {
                await removeComment({ variables: { commentId } });
            } catch (error) {
                const isNotFound = error instanceof Error && error.message.includes('не найден');
                if (isNotFound) return;
                if (prev) {
                    setComments((current) =>
                        current.map((c) => (c._id === commentId ? prev : c))
                    );
                }
                setError('Failed to delete comment');
            }
        },
        [removeComment]
    );

    const clearError = useCallback(() => setError(null), []);

    return { comments, loading, error, clearError, hasMoreComments, loadMore, onSave, onDelete };
};
