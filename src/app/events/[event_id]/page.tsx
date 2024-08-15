"use client";

import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";

import { Event } from "@/components/Event";
import Arrow from "@/assets/icons/arrow.svg";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { CommentsList } from "@/components/CommentsList";

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
        <>
            <section className={styles.eventPage}>
                <div className={styles.eventWrapper}>
                    <Button className={styles.arrowButton} resetDefaultStyles={true}>
                        <Arrow />
                    </Button>

                    <Event event={data.event} />
                </div>
            </section>
            <CommentsList event_id={event_id} />
        </>
    );
};

export default EventPage;
