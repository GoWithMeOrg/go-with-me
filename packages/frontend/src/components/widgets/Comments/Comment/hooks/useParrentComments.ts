import { useCallback, useEffect, useState } from 'react';
import { CREATE_COMMENT_MUTATION, REMOVE_COMMENT_MUTATION } from '@/app/graphql/mutations/comment';
import { GET_PARENT_COMMENTS_BY_OWNER_ID } from '@/app/graphql/queries/comment';
import { Comment as CommentType, OwnerType } from '@/app/graphql/types';
import { useLazyQuery, useMutation } from '@apollo/client/react';

const INITIAL_LIMIT = 3;
const LOAD_MORE_LIMIT = 5;

export const useParrentComments = (ownerId: string) => {
    const [offset, setOffset] = useState(0);
    const [currentLimit, setCurrentLimit] = useState(INITIAL_LIMIT);
    const [comments, setComments] = useState<CommentType[]>([]);

    const [fetchComments, { loading: fetchLoading }] = useLazyQuery<{
        getParentCommentsByOwnerId: CommentType[];
    }>(GET_PARENT_COMMENTS_BY_OWNER_ID, {
        fetchPolicy: 'network-only',
    });

    const [createComment] = useMutation<{ createComment: CommentType }>(CREATE_COMMENT_MUTATION);
    const [removeComment] = useMutation(REMOVE_COMMENT_MUTATION);

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

    const hasMore = comments.length === offset + currentLimit;

    const loadMore = async () => {
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

    return {
        comments,
        loading: fetchLoading,
        loadMore,
        hasMore,
        onSaveComment,
        onDeleteComment,
    };
};
