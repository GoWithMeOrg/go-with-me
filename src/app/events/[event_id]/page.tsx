"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ApolloQueryResult, FetchResult, gql, OperationVariables, useMutation, useQuery } from "@apollo/client";

import { Event } from "@/components/Event";
import { Comments } from "@/components/Comments";
import { CommentsList } from "@/components/CommentsList";
import { createContext, useCallback, useMemo } from "react";

type PageParams = {
    params: { event_id: string };
};

interface IPageActionsContext {
    handleSaveComment: (commentContent: string) => Promise<FetchResult<any>>;
}

interface IPageStateContext {
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}

export const PageActionsContext = createContext<IPageActionsContext | null>(null);
export const PageStateContext = createContext<IPageStateContext | null>(null);

const GET_EVENT_BY_ID = gql`
    #graphql
    query GetEventById($id: ID!) {
        event(id: $id) {
            organizer_id
            organizer {
                _id
                name
                email
            }
            name
            description
            startDate
            endDate
            time
            image
        }
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

const EventPage: NextPage<PageParams> = (context) => {
    const { data: session } = useSession();
    const { data, error, loading, refetch } = useQuery(GET_EVENT_BY_ID, { variables: { id: context.params.event_id } });
    const [saveComment] = useMutation(SAVE_COMMENT);

    const handleSaveComment = useCallback(
        (commentContent: string) =>
            saveComment({
                variables: {
                    comment: {
                        event_id: context.params.event_id,
                        // @ts-ignore TODO: fix type
                        author_id: session?.user?.id,
                        content: commentContent,
                    },
                },
            }),
        [context.params.event_id, saveComment, session?.user],
    );

    const pageActionsContextValue = useMemo(() => ({ handleSaveComment }), [handleSaveComment]);
    const PageStateContextValue = useMemo(() => ({ refetch }), [refetch]);

    if (loading && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="EventPage">
            <h3>EventPage</h3>

            <Link href={`/events/${context.params.event_id}/edit`}>Edit</Link>

            <Event event={data.event} />

            <div>{data.event.time}</div>

            {/* <Comments comments={data.comments} onSave={handleSaveComment} /> */}
            <PageActionsContext.Provider value={pageActionsContextValue}>
                <PageStateContext.Provider value={PageStateContextValue}>
                    <CommentsList comments={data.comments} />
                </PageStateContext.Provider>
            </PageActionsContext.Provider>
        </div>
    );
};

export default EventPage;
