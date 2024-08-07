"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";
import { gql, useQuery } from "@apollo/client";

import { Event } from "@/components/Event";
import { CommentsList } from "@/components/CommentsList";

import styles from "./EventPage.module.css";

type PageParams = {
    params: { event_id: string };
};

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

const EventPage: NextPage<PageParams> = ({ params: { event_id } }) => {
    const { data, error, loading, refetch } = useQuery(GET_EVENT_BY_ID, { variables: { id: event_id } });

    console.log("data", data);

    if (loading && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={styles.eventPage}>
            <h3>EventPage</h3>

            <Link href={`/events/${event_id}/edit`}>Edit</Link>

            <Event event={data.event} />

            <div>{data.event.time}</div>

            <CommentsList {...{ comments: data.comments, event_id, refetch }} />
        </section>
    );
};

export default EventPage;
