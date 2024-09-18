import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useSession } from "next-auth/react";

import { ICommentData } from "../types";

const GET_COMMENTS_BY_EVENT_ID = gql`
    #graphql
    query GetEventById($id: ID!, $limit: Int) {
        comments(event_id: $id, limit: $limit) {
            _id
            author {
                name
                image
            }
            replies {
                _id
                author {
                    name
                    image
                }
                content
                createdAt
                likes
                replyTo {
                    id
                    userName
                }
                parentId
                replyToList
            }
            content
            createdAt
            likes
            parentId
            replyToList
        }
    }
`;

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

const LIKE_COMMENT = gql`
    #graphql
    mutation LikeComment($commentId: ID!, $userId: ID!) {
        likeComment(commentId: $commentId, userId: $userId) {
            _id
            content
            likes
        }
    }
`;

export const useComments = (event_id: string) => {
    const limit = useRef<number>(5);
    const [comments, setComments] = useState<ICommentData[]>([]);
    const { data, error, loading, refetch } = useQuery<{ comments: ICommentData[] } | undefined>(
        GET_COMMENTS_BY_EVENT_ID,
        {
            variables: { id: event_id, limit: limit.current },
        },
    );
    const [saveComment] = useMutation(SAVE_COMMENT);
    const [likeComment] = useMutation(LIKE_COMMENT);
    const session = useSession();
    // @ts-ignore TODO: fix type
    const author_id: string = session.data?.user?.id;

    useEffect(() => {
        if (data) setComments(data.comments);
    }, [data]);

    return { comments, error, loading, refetch, saveComment, likeComment, author_id, limit };
};
