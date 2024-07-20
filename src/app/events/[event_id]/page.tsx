"use client";

import type { NextPage } from "next";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

import { Event } from "@/components/Event";
import { CommentsList } from "@/components/CommentsList";
import { Loader } from "@/components/Loader";

import styles from "./EventPage.module.css";

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
    }
`;

const EventPage: NextPage<PageParams> = ({ params: { event_id } }) => {
    const { data, error, loading } = useQuery(GET_EVENT_BY_ID, { variables: { id: event_id } });

    if (loading && !error) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={styles.eventPage}>
            <h3>EventPage</h3>

            <Link href={`/events/${event_id}/edit`}>Edit</Link>

            {/* <Link href={`/events/${context.params.event_id}/edit`}>Edit</Link> */}

            {/* <CommentsList
                    comments={data.comments}
                    //onSave={handleSaveComment}
                /> */}

            <CommentsList {...{ event_id }} />
        </section>
    );
};

export default EventPage;
