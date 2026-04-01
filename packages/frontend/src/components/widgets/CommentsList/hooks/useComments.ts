import { GET_COMMENTS_BY_OWNER_ID } from '@/app/graphql/queries/comment';
import { Comment } from '@/app/graphql/types';
import { useQuery } from '@apollo/client/react';

interface IUseComments {
    event_id: string;
    limit: number;
    offset: number;
}

// export const useComments = ({ event_id, limit, offset }: IUseComments) => {
//     const { data, error, loading, refetch } = useQuery<{ getCommentsByOwnerId: Comment[] }>(
//         GET_COMMENTS_BY_OWNER_ID,
//         {
//             variables: { ownerId: event_id, limit, offset },
//             skip: !event_id,
//         }
//     );

//     return { data, error, loading, refetch };
// };
