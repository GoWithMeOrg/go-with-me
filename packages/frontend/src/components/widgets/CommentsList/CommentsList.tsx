'use client';

import Spinner from '@/assets/icons/spinner.svg';
import { Button } from '@/components/shared/Button';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Title } from '@/components/shared/Title';

import { Comment } from './Comment';
import { useParrentComments } from './Comment/hooks/useParrentComments';
import { CommentForm } from './CommentForm';

import classes from './CommentsList.module.css';

export const CommentsList = ({ event_id }: { event_id: string }) => {
    const {
        comments,
        loading: parentCommentsLoading,
        loadMore,
        hasMore,
        onSaveComment,
        onDeleteComment,
    } = useParrentComments(event_id);

    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Комментарии
            </Title>
            <CommentForm onSaveComment={onSaveComment} />
            <ul className={classes.commentsList}>
                {comments?.map((comment) => (
                    <li key={comment._id}>
                        <Comment comment={comment} onDelete={onDeleteComment} />
                    </li>
                ))}
            </ul>
            {(parentCommentsLoading || parentCommentsLoading) && (
                <MessageContainer>
                    <Spinner />
                </MessageContainer>
            )}
            {hasMore && (
                <Button
                    className={classes.loadButton}
                    disabled={parentCommentsLoading}
                    onClick={loadMore}
                >
                    LOAD MORE COMMENTS
                </Button>
            )}
        </section>
    );
};
