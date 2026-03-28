'use client';

import { FC } from 'react';
import { Comment as CommentType } from '@/app/graphql/types';
import ArrowReply from '@/assets/icons/arrowReply.svg';
import { Avatar } from '@/components/shared/Avatar';
import { Span } from '@/components/shared/Span/Span';
import { useUserID } from '@/hooks/useUserID';
import dayjs from 'dayjs';
import Link from 'next/link';

import { Like } from '../../Like';
import { ReplyTo } from '../types';
import { useComment } from './hooks/useComment';

import classes from './Comment.module.css';

interface CommentProps {
    comment: CommentType;
    onClickReplyButton: (props: { replyTo: ReplyTo; parentId: string }) => void;
}

export const Comment: FC<CommentProps> = ({ comment, onClickReplyButton }) => {
    const { user_id } = useUserID();
    const { onDeleteComment } = useComment({ owner_id: comment.ownerId });
    const comment_id = comment._id;

    return (
        <div className={classes.comment} id={`comment-id-${comment_id}`}>
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
                    {comment.parent ? (
                        <Link href={`#comment-id-${comment.parent._id}`}>
                            ответ на {comment.parent.author.firstName}{' '}
                            {comment.parent.author.lastName}
                        </Link>
                    ) : null}
                    <Span title={dayjs(comment.createdAt).format('DD MMMM YYYY HH:mm')}></Span>
                </div>
                <p className={classes.commentText}>{comment.content}</p>

                <div className={classes.likesContainer}>
                    <Like owner_id={comment_id} ownerType={'Comment'} count />
                    <button
                        className={classes.replyButton}
                        onClick={() =>
                            onClickReplyButton({
                                replyTo: {
                                    id: comment_id,
                                    userName: `${comment.author.firstName} ${comment.author.lastName}`,
                                },
                                parentId: comment.parent?._id
                                    ? comment.parent._id.toString()
                                    : comment_id,
                            })
                        }
                    >
                        <ArrowReply />
                    </button>
                    {user_id === comment.author._id && (
                        <button
                            className={classes.deleteButton}
                            onClick={() => onDeleteComment(comment_id)}
                        >
                            удалить
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
