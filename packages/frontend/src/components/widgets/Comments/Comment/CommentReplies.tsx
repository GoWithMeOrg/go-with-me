import { Comment as CommentType } from '@go-with-me/shared/graphql';

import Spinner from '@/assets/icons/spinner.svg';
import { MessageContainer } from '@/components/shared/MessageContainer/MessageContainer';
import { Comment } from './Comment';

import classes from './Comment.module.css';

interface CommentRepliesProps {
    replies: CommentType[];
    loading: boolean;
    depth: number;
    totalCount: number;
    loadedReplies: boolean;
    hasMoreReplies: boolean;
    onLoadMore: () => void;
    onDeleteReply: (id: string) => void;
}

export const CommentReplies = ({
    replies,
    loading,
    depth,
    totalCount,
    loadedReplies,
    hasMoreReplies,
    onLoadMore,
    onDeleteReply,
}: CommentRepliesProps) => {
    const hasReplies = totalCount > 0 || replies.length > 0;

    const loadMoreButton = depth === 0 && totalCount > 0 && (!loadedReplies || hasMoreReplies) && (
        <button className={classes.loadMoreReplies} onClick={onLoadMore}>
            {!loadedReplies ? `${totalCount} Replies` : 'Show more replies'}
        </button>
    );

    if (!hasReplies && !loadMoreButton) return null;

    return (
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
            {loadMoreButton}
        </ul>
    );
};
