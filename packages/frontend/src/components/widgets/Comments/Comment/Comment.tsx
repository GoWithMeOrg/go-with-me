'use client';

import { FC } from 'react';
import { Comment as CommentType } from '@/app/graphql/types';
import ArrowReply from '@/assets/icons/arrowReply.svg';
import Spinner from '@/assets/icons/spinner.svg';
import Trash from '@/assets/icons/trash.svg';
import { Avatar } from '@/components/shared/Avatar';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Span } from '@/components/shared/Span/Span';
import { CommentForm } from '@/components/widgets/Comments/CommentForm';
import { Like } from '@/components/widgets/Like';
import { useUserID } from '@/hooks/useUserID';
import dayjs from 'dayjs';

import { useComments } from './hooks/useComments';

import classes from './Comment.module.css';

interface CommentProps {
    comment: CommentType;
    depth?: number; // 0 = корневой, 1+ = ответ
    onDelete?: (id: string) => void;
}

export const Comment: FC<CommentProps> = ({ comment, depth = 0, onDelete }) => {
    const { user_id } = useUserID();

    const {
        replies,
        loading,
        onClickReplyButton,
        loadMoreReplies,
        hasMoreReplies,
        onSaveReply,
        closeReplyForm,
        replyToState,
        onDeleteComment,
        onDeleteReply,
        totalCount,
        loadedReplies,
    } = useComments(comment.ownerId, comment);

    // Выносим в переменную — рендерим в разных местах в зависимости от depth
    const repliesSection = (comment.repliesCount > 0 || replies.length > 0) && (
        <ul className={classes.replies}>
            {replies?.map((reply) => (
                // Всё глубже 0 получает depth=1 — ответы на ответы не уходят на 3й уровень
                <Comment
                    key={reply._id}
                    comment={reply}
                    depth={Math.min(depth + 1, 1)}
                    onDelete={onDeleteReply}
                />
            ))}
            {loading && (
                <MessageContainer>
                    <Spinner />
                </MessageContainer>
            )}
        </ul>
    );

    const loadMoreButton = depth === 0 && totalCount > 0 && (!loadedReplies || hasMoreReplies) && (
        <button className={classes.loadMoreReplies} onClick={loadMoreReplies}>
            {!loadedReplies ? `${totalCount} Replies` : 'Show more replies'}
        </button>
    );

    if (comment.deleted) {
        return (
            <>
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
                                        title={`ответил ${comment.parent.author?.firstName ?? ''} ${comment.parent.author?.lastName ?? ''}`}
                                    />
                                </a>
                            )}
                            <Span title={dayjs(comment.createdAt).format('DD MMMM YYYY HH:mm')} />
                        </div>

                        <div className={classes.deletedComment}>
                            <span>Комментарий удалён</span>
                        </div>

                        {depth === 0 && repliesSection}
                        {depth === 0 && loadMoreButton}
                    </div>
                </div>
                {depth >= 1 && repliesSection}
            </>
        );
    }

    return (
        // нужен, чтобы depth >= 1 мог вынести repliesSection наружу как сиблинг
        <>
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
                                    title={`ответил ${comment.parent.author?.firstName ?? ''} ${comment.parent.author?.lastName ?? ''}`}
                                />
                            </a>
                        )}
                        <Span title={dayjs(comment.createdAt).format('DD MMMM YYYY HH:mm')} />
                    </div>

                    <p className={classes.commentText}>{comment.content}</p>

                    <div className={classes.likesContainer}>
                        <Like owner_id={comment._id} ownerType="Comment" count />
                        {user_id !== comment.author._id && (
                            <button className={classes.replyButton} onClick={onClickReplyButton}>
                                <ArrowReply />
                            </button>
                        )}
                        {user_id === comment.author._id && (
                            <button
                                className={classes.deleteButton}
                                onClick={() => onDelete?.(comment._id)}
                            >
                                <Trash />
                            </button>
                        )}
                    </div>

                    {replyToState?.id === comment._id && (
                        <CommentForm onSaveComment={onSaveReply} onClose={closeReplyForm} />
                    )}

                    {/* depth === 0: ответы рендерятся ВНУТРИ — получают отступ (уровень 1) */}
                    {depth === 0 && repliesSection}
                    {depth === 0 && loadMoreButton}
                </div>
            </div>

            {/* depth >= 1: ответы рендерятся СНАРУЖИ как сиблинги в ul родителя — остаются на уровне 1 */}
            {depth >= 1 && repliesSection}
        </>
    );
};
