import { useEffect, useState } from 'react';
import { GET_CHILDREN_COMMENTS_BY_PARRENT_ID } from '@/app/graphql/queries/comment';
import { Comment as CommentType } from '@/app/graphql/types';
import { useLazyQuery } from '@apollo/client/react';

const INITIAL_REPLIES_LIMIT = 3;
const LOAD_MORE_LIMIT = 5;

export const useCommentReplies = (parentId: string, totalCount?: number) => {
    const [replies, setReplies] = useState<CommentType[]>([]);

    const [fetchQuery, { loading }] = useLazyQuery<{
        getChildrenCommentsByParrentId: CommentType[];
    }>(GET_CHILDREN_COMMENTS_BY_PARRENT_ID, {
        fetchPolicy: 'network-only',
    });

    const totalCountNum = Math.floor(totalCount || 0);
    const loadedCount = replies.length;
    const hasMore = loadedCount < totalCountNum;
    const remainingCount = Math.max(0, totalCountNum - loadedCount);

    useEffect(() => {
        if (!parentId) return;
        let cancelled = false;

        fetchQuery({
            variables: { parentId, limit: INITIAL_REPLIES_LIMIT, offset: 0 },
        })
            .then(({ data }) => {
                if (cancelled) return;
                setReplies(data?.getChildrenCommentsByParrentId || []);
            })
            .catch((error) => {
                if (error?.name === 'AbortError' || cancelled) return;
            });

        return () => {
            cancelled = true;
        };
    }, [parentId]);

    const loadMore = async () => {
        if (!hasMore || loading) return;

        const { data } = await fetchQuery({
            variables: {
                parentId,
                offset: loadedCount,
                limit: Math.min(LOAD_MORE_LIMIT, remainingCount),
            },
        });

        if (data?.getChildrenCommentsByParrentId) {
            setReplies((prev) => [...prev, ...data.getChildrenCommentsByParrentId]);
        }
    };

    // Удаление управляется локально, без refetch
    const removeReply = (commentId: string) => {
        setReplies((prev) => prev.filter((reply) => reply._id !== commentId));
    };

    return {
        replies,
        loading,
        loadMore,
        hasMore,
        remainingCount,
        removeReply,
    };
};
