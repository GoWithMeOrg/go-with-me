import { Comment as CommentType } from '@/app/graphql/types';
import { Span } from '@/components/shared/Span/Span';
import dayjs from 'dayjs';

import classes from './Comment.module.css';

interface CommentHeaderProps {
    comment: CommentType;
}

export const CommentHeader = ({ comment }: CommentHeaderProps) => (
    <div className={classes.userName}>
        <span>{`${comment.author.firstName} ${comment.author.lastName}`}</span>
        {comment.parent && (
            <a href={`#comment-id-${comment.parent._id}`}>
                <Span
                    className={classes.replyTo}
                    title={`ответил ${comment.parent.author?.firstName ?? ''} ${comment.parent.author?.lastName ?? ''}`}
                />
            </a>
        )}
        <Span title={dayjs(comment.createdAt).format('DD MMMM YYYY HH:mm')} />
    </div>
);
