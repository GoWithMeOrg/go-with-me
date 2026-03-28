import { GET_COMMENTS_BY_OWNER_ID } from '@/app/graphql/queries/comment';
import { useSessionGQL } from '@/app/providers/session/hooks/useSesssionGQL';
import { useMutation, useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';
import { useSession } from 'next-auth/react';

import { ICommentData } from '../types';

interface IUseComments {
    event_id: string;
    limit: number;
}

// const GET_COMMENTS_BY_EVENT_ID = gql`
//     #graphql
//     query GetEventById($id: ID!, $limit: Int) {
//         comments(event_id: $id, limit: $limit) {
//             _id
//             author {
//                 name
//                 image
//                 _id
//             }
//             replies {
//                 _id
//                 author {
//                     name
//                     image
//                     _id
//                 }
//                 content
//                 createdAt
//                 likes
//                 replyTo {
//                     id
//                     userName
//                 }
//                 parentId
//                 replyToList
//             }
//             content
//             createdAt
//             likes
//             parentId
//             replyToList
//         }
//     }
// `;

const SAVE_COMMENT = gql`
    #graphql
    mutation SaveComment($comment: CommentInput!) {
        saveComment(comment: $comment) {
            _id
            author {
                _id
            }
            replyTo {
                id
                userName
            }
            content
            parentId
        }
    }
`;

const DELETE_COMMENT = gql`
    #graphql
    mutation deleteComment($commentId: ID!, $userId: ID!) {
        deleteComment(commentId: $commentId, userId: $userId)
    }
`;

export const useComments = ({ event_id, limit }: IUseComments) => {
    const { data, error, loading, refetch } = useQuery(GET_COMMENTS_BY_OWNER_ID, {
        variables: { ownerId: event_id },
        skip: !event_id,
    });

    const [saveComment] = useMutation(SAVE_COMMENT);
    const [deleteComment] = useMutation(DELETE_COMMENT);
    const session = useSessionGQL();
    // @ts-ignore TODO: fix type
    const author_id: string = session.data?.user?.id;

    return { data, error, loading, refetch, saveComment, deleteComment, author_id };
};
