'use client';

import { FC, useState } from 'react';
import { Comment as CommentType } from '@/app/graphql/types';
import ArrowReply from '@/assets/icons/arrowReply.svg';
import Spinner from '@/assets/icons/spinner.svg';
import { Avatar } from '@/components/shared/Avatar';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Span } from '@/components/shared/Span/Span';
import { useUserID } from '@/hooks/useUserID';
import dayjs from 'dayjs';

import { Like } from '../../Like';
import { CommentForm } from '../CommentForm';
import { ReplyTo } from '../types';
import { useCommentReplies } from './hooks/useChildrenComments';
import { useComment } from './hooks/useComment';

import classes from './Comment.module.css';

interface CommentProps {
    comment: CommentType;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
    const { user_id } = useUserID();
    const [replyToState, setReplyToState] = useState<ReplyTo | null>(null);

    const { onDeleteComment, onSaveCommentReply } = useComment({
        owner_id: comment.ownerId,
        parent_id: comment._id,
    });

    const { replies, loading, loadMore, hasMore, remainingCount } = useCommentReplies(
        comment._id,
        comment.repliesCount
    );

    const onClickReplyButton = () => {
        const replyTo: ReplyTo = {
            id: comment._id,
            userName: `${comment.author.firstName} ${comment.author.lastName}`,
        };

        // Повторный клик — закрывает форму ответа
        if (replyToState?.id === comment._id) {
            setReplyToState(null);
        } else {
            setReplyToState(replyTo);
        }
    };

    return (
        <div className={classes.comment} id={`comment-id-${comment._id}`}>
            <div className={classes.avatarContainer}>
                <Avatar
                    className={classes.avatar}
                    name={`${comment.author.firstName} ${comment.author.lastName}`}
                    image={comment.author.image as string}
                    scale={0.75}
                    id={comment.author._id}
                />
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.userName}>
                    <span>{`${comment.author.firstName} ${comment.author.lastName}`}</span>
                    {comment.parent && (
                        <a href={`#comment-id-${comment.parent._id}`}>
                            <Span
                                className={classes.replyTo}
                                title={`ответ на ${comment.parent.author?.firstName ?? ''} ${comment.parent.author?.lastName ?? ''}`}
                            />
                        </a>
                    )}

                    <Span title={dayjs(comment.createdAt).format('DD MMMM YYYY HH:mm')} />
                </div>

                <p className={classes.commentText}>{comment.content}</p>

                <div className={classes.likesContainer}>
                    <Like owner_id={comment._id} ownerType="Comment" count />

                    <button className={classes.replyButton} onClick={onClickReplyButton}>
                        <ArrowReply />
                    </button>

                    {user_id === comment.author._id && (
                        <button
                            className={classes.deleteButton}
                            onClick={() => onDeleteComment(comment._id)}
                        >
                            удалить
                        </button>
                    )}
                </div>

                {/* форма ответа появляется под конкретным комментарием */}
                {replyToState?.id === comment._id && (
                    <CommentForm
                        onSaveComment={onSaveCommentReply}
                        onClose={() => setReplyToState(null)}
                    />
                )}

                {/* потомки рендерятся рекурсивно — первые 3 показываем сразу */}
                {comment.repliesCount > 0 && (
                    <ul className={classes.replies}>
                        {replies?.map((reply) => (
                            <Comment key={reply._id} comment={reply} />
                        ))}
                        {loading && (
                            <MessageContainer>
                                <Spinner />
                            </MessageContainer>
                        )}
                        {loadMore && hasMore && (
                            <button className={classes.loadMoreReplies} onClick={loadMore}>
                                Show {remainingCount} more replies
                            </button>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};
