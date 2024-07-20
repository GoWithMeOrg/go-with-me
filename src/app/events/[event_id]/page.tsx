"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Event } from "@/components/Event";
import { Comments } from "@/components/Comments";
import classes from "./page.module.css";
import Arrow from "@/assets/icons/arrow.svg";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

type PageParams = {
    params: { event_id: string };
};

const GET_EVENT_BY_ID = gql`
    #graphql
    query GetEventById($id: ID!) {
        event(id: $id) {
            _id
            organizer_id
            organizer {
                _id
                name
                email
            }
            name
            location {
                coordinates
                properties {
                    address
                }
            }
            status
            description
            startDate
            endDate
            time
            categories
            types
            image
        }
        comments(event_id: $id) {
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
    const { data, error, loading } = useQuery(GET_EVENT_BY_ID, { variables: { id: context.params.event_id } });
    const [saveComment] = useMutation(SAVE_COMMENT);

    if (loading && !error) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleSaveComment = (commentContent: string) => {
        saveComment({
            variables: {
                comment: {
                    event_id: context.params.event_id,
                    // @ts-ignore TODO: fix type
                    author_id: session?.user?.id,
                    content: commentContent,
                },
            },
        })
            .then((response) => {
                console.log("EventPage: ", response); // eslint-disable-line
            })
            .catch((error) => {
                console.error("EventPage: ", error); // eslint-disable-line
            });
    };

    console.log(data);
    return (
        <div className={classes.container}>
            <div className={classes.eventWrapper}>
                <Button className={classes.arrowButton}>
                    <Arrow />
                </Button>

                <Event event={data.event} />
            </div>

            {/* <Link href={`/events/${context.params.event_id}/edit`}>Edit</Link> */}

            {/* <div>{data.event.time}</div> */}

            {/* <h3>Comments</h3>
            <Comments comments={data.comments} onSave={handleSaveComment} /> */}
        </div>
    );
};

export default EventPage;
