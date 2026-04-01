'use client';

import { FC, useState } from 'react';
import { Comment as CommentType } from '@/app/graphql/types';
import Spinner from '@/assets/icons/spinner.svg';
import { Button } from '@/components/shared/Button';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Title } from '@/components/shared/Title';

import { Comment } from './Comment';
import { useComment } from './Comment/hooks/useComment';
import { useParrentComments } from './Comment/hooks/useParrentComments';
import { CommentForm } from './CommentForm';
import { ReplyTo } from './types';

import classes from './CommentsList.module.css';

interface CommentsListProps {
    event_id: string;
}

export const CommentsList: FC<CommentsListProps> = ({ event_id }) => {
    const [limit, setLimit] = useState<number>(5);
    const { comments, loading: parrenCoomentsLoading, loadMore } = useParrentComments(event_id, 5);

    const { onSaveComment, onSaveCommentReply, loading, setLoading } = useComment({
        owner_id: event_id,
    });

    const renderComment = (
        comment: CommentType,
        level: number = 0,
        visited = new Set<string>()
    ) => {
        if (visited.has(comment._id)) return null;
        visited.add(comment._id);

        return (
            <li key={comment._id} className={level > 0 ? classes.nestedComment : ''}>
                <Comment comment={comment} />
            </li>
        );
    };

    // if (error) return <MessageContainer>Error: {error.message}</MessageContainer>;

    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Комментарии
            </Title>
            <CommentForm onSaveComment={onSaveComment} />
            <ul className={classes.commentsList}>
                {comments?.map((comment) => renderComment(comment))}
            </ul>
            {loading && (
                <MessageContainer>
                    <Spinner />
                </MessageContainer>
            )}
            {(comments?.length ?? 0) >= limit && (
                <Button className={classes.loadButton} disabled={loading} onClick={loadMore}>
                    Больше комментариев
                </Button>
            )}
        </section>
    );
};
