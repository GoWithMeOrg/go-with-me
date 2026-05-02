import { useCallback, useState } from 'react';
import { CREATE_REPLY_MUTATION, REMOVE_COMMENT_MUTATION } from '@/app/graphql/mutations/comment';
import { GET_CHILDREN_COMMENTS_BY_PARENT_ID } from '@/app/graphql/queries/comment';
import { Comment as CommentType, OwnerType } from '@/app/graphql/types';
import { ReplyTo } from '@/components/widgets/Comments/types';
import { useLazyQuery, useMutation } from '@apollo/client/react';

const LOAD_MORE_LIMIT = 5;

export const useChildrenComments = (comment: CommentType) => {
    const [totalCount, setTotalCount] = useState(comment.repliesCount ?? 0);
    const [loadedReplies, setLoadedReplies] = useState(false);
    const [replies, setReplies] = useState<CommentType[]>([]);
    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);

    const hasMore = replies.length < totalCount;

    const [fetchComments, { loading: fetchLoading, error }] = useLazyQuery<{
        getChildrenCommentsByParentId: CommentType[];
    }>(GET_CHILDREN_COMMENTS_BY_PARENT_ID, { fetchPolicy: 'network-only' });

    const [createCommentReply, { loading: createLoading }] = useMutation<{
        createReply: CommentType;
    }>(CREATE_REPLY_MUTATION);
    const [removeComment, { loading: deleteLoading }] = useMutation(REMOVE_COMMENT_MUTATION);

    const loadMore = async () => {
        const { data } = await fetchComments({
            variables: { parentId: comment._id, offset: replies.length, limit: LOAD_MORE_LIMIT },
        });

        if (data?.getChildrenCommentsByParentId) {
            setReplies((prev) => [...prev, ...data.getChildrenCommentsByParentId]);
            setLoadedReplies(true);
        }
    };

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

    const onDeleteComment = useCallback(
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
        totalCount,
        loadedReplies,
    };
};
