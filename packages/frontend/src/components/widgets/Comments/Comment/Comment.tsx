'use client';

import { memo, useCallback, useState } from 'react';
import { Comment as CommentType } from '@/app/graphql/types';
import { Avatar } from '@/components/shared/Avatar';
import { useUserID } from '@/hooks/useUserID';

import { useLikesContext } from '../LikesContext';
import { CommentContent } from './CommentContent';
import { CommentHeader } from './CommentHeader';
import { CommentReplies } from './CommentReplies';
import { useCommentReplies } from './hooks/useCommentReplies';

import classes from './Comment.module.css';

interface CommentProps {
    comment: CommentType;
    depth?: number;
    onDelete?: (id: string) => void;
}

interface ReplyToState {
    id: string;
    authorName: string;
}

const CommentInner = ({ comment, depth = 0, onDelete }: CommentProps) => {
    const { user_id } = useUserID();
    const likesContext = useLikesContext();
    const likeData = likesContext?.[comment._id];

    const {
        replies,
        loading,
        loadMore,
        hasMoreReplies,
        onSave,
        onDelete: onDeleteReply,
        totalCount,
        loadedReplies,
    } = useCommentReplies(comment);

    const [replyToState, setReplyToState] = useState<ReplyToState | null>(null);

    const onClickReplyButton = useCallback(() => {
        setReplyToState((prev) =>
            prev?.id === comment._id
                ? null
                : { id: comment._id, authorName: `${comment.author.firstName} ${comment.author.lastName}` }
        );
    }, [comment._id, comment.author.firstName, comment.author.lastName]);

    const closeReplyForm = useCallback(() => setReplyToState(null), []);

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
                    <CommentHeader comment={comment} />
                    <CommentContent
                        comment={comment}
                        userId={user_id as string}
                        initialIsLiked={likeData?.isLiked}
                        initialLikesCount={likeData?.count}
                        showReplyForm={replyToState?.id === comment._id}
                        onReply={onClickReplyButton}
                        onDelete={() => onDelete?.(comment._id)}
                        onSaveReply={onSave}
                        onCloseReplyForm={closeReplyForm}
                    />
                    {depth === 0 && (
                        <CommentReplies
                            replies={replies}
                            loading={loading}
                            depth={depth}
                            totalCount={totalCount}
                            loadedReplies={loadedReplies}
                            hasMoreReplies={hasMoreReplies}
                            onLoadMore={loadMore}
                            onDeleteReply={onDeleteReply}
                        />
                    )}
                </div>
            </div>
            {depth >= 1 && (
                <CommentReplies
                    replies={replies}
                    loading={loading}
                    depth={depth}
                    totalCount={totalCount}
                    loadedReplies={loadedReplies}
                    hasMoreReplies={hasMoreReplies}
                    onLoadMore={loadMore}
                    onDeleteReply={onDeleteReply}
                />
            )}
        </>
    );
};

export const Comment = memo(CommentInner);
