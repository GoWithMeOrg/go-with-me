import { useCallback, useRef, useState } from 'react';
import {
    CREATE_REPLY_MUTATION,
    REMOVE_COMMENT_MUTATION,
} from '@/app/graphql/mutations/comment';
import { GET_CHILDREN_COMMENTS_BY_PARENT_ID } from '@/app/graphql/queries/comment';
import { Comment as CommentType, OwnerType } from '@/app/graphql/types';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { buildOptimisticComment } from './commentUtils';

const LOAD_MORE_LIMIT = 5;

export const useCommentReplies = (comment: CommentType) => {
    const [totalCount] = useState(comment.repliesCount);
    const [loadedReplies, setLoadedReplies] = useState(false);
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const repliesRef = useRef(replies);
    repliesRef.current = replies;

    const [fetchReplies, { loading }] = useLazyQuery<{
        getChildrenCommentsByParentId: CommentType[];
    }>(GET_CHILDREN_COMMENTS_BY_PARENT_ID, { fetchPolicy: 'cache-and-network' });

    const [createReply] = useMutation<{ createReply: CommentType }>(CREATE_REPLY_MUTATION);
    const [removeComment] = useMutation<{ removeComment: boolean }>(REMOVE_COMMENT_MUTATION);

    const hasMoreReplies = replies.length < totalCount;

    const loadMore = useCallback(async () => {
        try {
            const { data } = await fetchReplies({
                variables: { sort: 'newest', parentId: comment._id, offset: replies.length, limit: LOAD_MORE_LIMIT },
            });

            if (data?.getChildrenCommentsByParentId) {
                setReplies((prev) => [...prev, ...data.getChildrenCommentsByParentId]);
                setLoadedReplies(true);
            }
        } catch (err: any) {
            setError(err?.message ?? 'Failed to load replies');
        }
    }, [fetchReplies, comment._id, replies.length]);

    const onSave = useCallback(
        async (content: string) => {
            const optimistic = buildOptimisticComment(content, comment.ownerId, comment._id);

            setReplies((prev) => [optimistic, ...prev]);

            try {
                const result = await createReply({
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
                if (newReply) {
                    setReplies((prev) =>
                        prev.map((r) => (r._id === optimistic._id ? newReply : r))
                    );
                }
            } catch {
                setReplies((prev) => prev.filter((r) => r._id !== optimistic._id));
                setError('Failed to save reply');
            }
        },
        [createReply, comment]
    );

    const onDelete = useCallback(
        async (commentId: string) => {
            const prev = repliesRef.current.find((c) => c._id === commentId);

            setReplies((prevReplies) =>
                prevReplies.map((c) => (c._id === commentId ? { ...c, deleted: true, content: '' } : c))
            );

            try {
                await removeComment({ variables: { commentId } });
            } catch (error) {
                const isNotFound = error instanceof Error && error.message.includes('не найден');
                if (isNotFound) return;
                if (prev) {
                    setReplies((current) =>
                        current.map((c) => (c._id === commentId ? prev : c))
                    );
                }
                setError('Failed to delete reply');
            }
        },
        [removeComment]
    );

    const clearError = useCallback(() => setError(null), []);

    return {
        replies,
        loading,
        error,
        clearError,
        hasMoreReplies,
        loadedReplies,
        totalCount,
        loadMore,
        onSave,
        onDelete,
    };
};
