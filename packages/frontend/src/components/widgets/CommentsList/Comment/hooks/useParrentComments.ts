import { useState } from 'react';
import { GET_PARRENT_COMMENTS_BY_OWNER_ID } from '@/app/graphql/queries/comment';
import { Comment as CommentType } from '@/app/graphql/types';
import { useQuery } from '@apollo/client/react';

export const useParrentComments = (ownerId: string, limit: number) => {
    const [offset, setOffset] = useState(0);

    const { data, loading, fetchMore } = useQuery<{ getParrentCommentsByOwnerId: CommentType[] }>(
        GET_PARRENT_COMMENTS_BY_OWNER_ID,
        {
            variables: { ownerId, limit, offset: 0 },
            notifyOnNetworkStatusChange: true,
        }
    );

    const loadMore = () => {
        fetchMore({ variables: { offset: offset + limit } });
        setOffset((prev) => prev + limit);
    };

    return { comments: data?.getParrentCommentsByOwnerId, loading, loadMore };
};
