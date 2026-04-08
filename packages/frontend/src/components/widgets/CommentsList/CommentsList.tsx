'use client';

import Spinner from '@/assets/icons/spinner.svg';
import { Button } from '@/components/shared/Button';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Title } from '@/components/shared/Title';

import { Comment } from './Comment';
import { useComment } from './Comment/hooks/useComment';
import { useParrentComments } from './Comment/hooks/useParrentComments';
import { CommentForm } from './CommentForm';

import classes from './CommentsList.module.css';

export const CommentsList = ({ event_id }: { event_id: string }) => {
    const { comments, loading: parentCommentsLoading, loadMore } = useParrentComments(event_id, 5);
    const { onSaveComment, loading } = useComment({ owner_id: event_id });

    return (
        <section className={classes.container}>
            <Title tag="h3" className={classes.title}>
                Комментарии
            </Title>
            <CommentForm onSaveComment={onSaveComment} />
            <ul className={classes.commentsList}>
                {comments?.map((comment) => (
                    <li key={comment._id}>
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
            {(parentCommentsLoading || loading) && (
                <MessageContainer>
                    <Spinner />
                </MessageContainer>
            )}
            {(comments?.length ?? 0) >= 5 && (
                <Button className={classes.loadButton} disabled={loading} onClick={loadMore}>
                    Больше комментариев
                </Button>
            )}
        </section>
    );
};
