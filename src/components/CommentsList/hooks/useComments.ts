import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { ICommentProps } from "../styles";
import { useSession } from "next-auth/react";

const GET_COMMENTS_BY_EVENT_ID = gql`
    #graphql
    query GetEventById($id: ID!) {
        comments(event_id: $id) {
            _id
            author {
                _id
                name
                email
            }
            # replies_id
            replies {
                _id
                author {
                    _id
                    name
                    email
                }
                content
                createdAt
                updatedAt
            }
            replyToId
            content
            createdAt
            updatedAt
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
                name
                email
            }
            content
            createdAt
            updatedAt
        }
    }
`;

export const useComments = (event_id: string) => {
    const { data, error, loading, refetch } = useQuery<{ comments: ICommentProps[] } | undefined>(
        GET_COMMENTS_BY_EVENT_ID,
        {
            variables: { id: event_id },
        },
    );
    const [saveComment] = useMutation(SAVE_COMMENT);
    const session = useSession();
    // @ts-ignore TODO: fix type
    const author_id: string = session.data?.user?.id;
    if (!data) throw new Error("Error fetch comments");
    const { comments } = data;

    return { comments, error, loading, refetch, saveComment, author_id };
};
