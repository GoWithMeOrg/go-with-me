'use client';

import { memo } from 'react';
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

import { useLikesContext } from '../LikesContext';
import { useComments } from './hooks/useComments';

import classes from './Comment.module.css';

interface CommentProps {
    comment: CommentType;
    depth?: number;
    onDelete?: (id: string) => void;
}

const CommentInner = ({ comment, depth = 0, onDelete }: CommentProps) => {
    const { user_id } = useUserID();
    const likesContext = useLikesContext();
    const likeData = likesContext?.[comment._id];

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

    const repliesSection = (comment.repliesCount > 0 || replies.length > 0) && (
        <ul className={classes.replies}>
            {replies?.map((reply) => (
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

    const header = (
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

    const body = comment.deleted ? (
        <div className={classes.deletedComment}>
            <span>Комментарий удалён</span>
        </div>
    ) : (
        <>
            <p className={classes.commentText}>{comment.content}</p>
            <div className={classes.likesContainer}>
                <Like
                    owner_id={comment._id}
                    ownerType="Comment"
                    count
                    initialIsLiked={likeData?.isLiked}
                    initialLikesCount={likeData?.count}
                />
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
        </>
    );

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
                    {header}
                    {body}
                    {depth === 0 && repliesSection}
                    {depth === 0 && loadMoreButton}
                </div>
            </div>
            {depth >= 1 && repliesSection}
        </>
    );
};

export const Comment = memo(CommentInner);
