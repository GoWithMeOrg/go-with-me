'use client';

import { FC } from 'react';
import ArrowReply from '@/assets/icons/arrowReply.svg';
import Heart from '@/assets/icons/heart.svg';
import { Avatar } from '@/components/shared/Avatar';
import { Span } from '@/components/shared/Span/Span';
import dayjs from 'dayjs';
import Link from 'next/link';

import { Like } from '../../Like';
import { ICommentAuthor, ICommentData, ReplyTo } from '../types';

import classes from './Comment.module.css';

interface IProps {
    comment: ICommentData;
    onClickReplyButton: (props: { replyTo: ReplyTo; parentId: string }) => void;
    onClickDeleteButton: (props: { commentId: string }) => void;
    isDeletable?: boolean;
}

const getAuthorName = (author: ICommentAuthor): string => {
    const { firstName, lastName } = author;
    return `${firstName || ''} ${lastName || ''}`.trim();
};

export const Comment: FC<IProps> = ({
    comment: { author, content, _id, replyTo, createdAt, parentId },
    onClickReplyButton,
    onClickDeleteButton,
    isDeletable,
}) => {
    const id = _id.toString();
    const authorName = getAuthorName(author);
    const authorImage = author.image ?? '';

    return (
        <div className={classes.comment} id={`comment-id-${id}`}>
            <div className={classes.avatarContainer}>
                <Avatar
                    className={classes.avatar}
                    name={authorName}
                    image={authorImage}
                    scale={0.75}
                    id={author._id}
                />
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.userName}>
                    <span>{authorName}</span>
                    {replyTo ? (
                        <Link href={`#comment-id-${replyTo.id}`}>ответ на {replyTo.userName}</Link>
                    ) : null}
                    <Span title={dayjs(createdAt).format('DD MMMM YYYY HH:mm')}></Span>
                </div>
                <p className={classes.commentText}>{content}</p>

                <div className={classes.likesContainer}>
                    <Like owner_id={id} ownerType={'Comment'} count />
                    <button
                        className={classes.replyButton}
                        onClick={() =>
                            onClickReplyButton({
                                replyTo: { id, userName: authorName },
                                parentId: parentId ? parentId.toString() : id,
                            })
                        }
                    >
                        <ArrowReply />
                    </button>
                    {isDeletable && (
                        <button
                            className={classes.deleteButton}
                            onClick={() => onClickDeleteButton({ commentId: id })}
                        >
                            удалить
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
