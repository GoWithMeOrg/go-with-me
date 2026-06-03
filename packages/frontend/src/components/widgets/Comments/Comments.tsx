'use client';

import { useMemo } from 'react';
import Spinner from '@/assets/icons/spinner.svg';
import { useQuery } from '@apollo/client/react';
import { GET_LIKES_BATCH } from '@/app/graphql/queries/like';
import { Button } from '@/components/shared/Button';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Title } from '@/components/shared/Title';
import { Comment } from '@/components/widgets/Comments/Comment';
import { CommentForm } from '@/components/widgets/Comments/CommentForm';

import { useCommentList } from './Comment/hooks/useCommentList';
import { LikesProvider } from './LikesContext';
import { LikeState } from './types';

import classes from './Comments.module.css';

export const Comments = ({ event_id }: { event_id: string }) => {
    const { comments, loading, error, clearError, hasMoreComments, loadMore, onSave, onDelete } =
        useCommentList(event_id);

    const allCommentIds = useMemo(() => {
        const ids = new Set<string>();
        for (const c of comments) ids.add(c._id);
        return ids.size > 0 ? Array.from(ids) : null;
    }, [comments]);

    const { data: likesData } = useQuery<{
        getLikesBatch: { ownerId: string; count: number; isLiked: boolean }[];
    }>(GET_LIKES_BATCH, {
        variables: { ownerIds: allCommentIds },
        skip: !allCommentIds,
        fetchPolicy: 'cache-and-network',
    });

    const likesMap: LikeState = useMemo(() => {
        if (!likesData?.getLikesBatch) return {};
        const map: LikeState = {};
        for (const item of likesData.getLikesBatch) {
            map[item.ownerId] = { isLiked: item.isLiked, count: item.count };
        }
        return map;
    }, [likesData]);

    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Комментарии
            </Title>
            <CommentForm onSaveComment={onSave} />
            {error && (
                <div className={classes.error} onClick={clearError}>
                    {error}
                </div>
            )}
            <LikesProvider value={likesMap}>
                <ul className={classes.commentsList}>
                    {comments?.map((comment) => (
                        <li key={comment._id}>
                            <Comment comment={comment} onDelete={onDelete} />
                        </li>
                    ))}
                </ul>
            </LikesProvider>
            {loading && (
                <MessageContainer>
                    <Spinner />
                </MessageContainer>
            )}
            {hasMoreComments && !loading && (
                <Button resetDefaultStyles className={classes.buttonText} onClick={loadMore}>
                    LOAD MORE COMMENTS
                </Button>
            )}
        </section>
    );
};
