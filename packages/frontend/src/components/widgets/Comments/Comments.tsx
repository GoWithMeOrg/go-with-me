'use client';

import Spinner from '@/assets/icons/spinner.svg';
import { Button } from '@/components/shared/Button';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Title } from '@/components/shared/Title';
import { Comment } from '@/components/widgets/Comments/Comment';
import { CommentForm } from '@/components/widgets/Comments/CommentForm';

import { useComments } from './Comment/hooks/useComments';

import classes from './Comments.module.css';

export const Comments = ({ event_id }: { event_id: string }) => {
    const { comments, loading, loadMoreComments, hasMoreComments, onSaveComment, onDeleteComment } =
        useComments(event_id);

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
            {loading && (
                <MessageContainer>
                    <Spinner />
                </MessageContainer>
            )}
            {hasMoreComments && (
                <Button
                    resetDefaultStyles
                    className={classes.buttonText}
                    onClick={loadMoreComments}
                >
                    LOAD MORE COMMENTS
                </Button>
            )}
        </section>
    );
};
