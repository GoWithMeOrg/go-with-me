"use client";

import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { Event } from "@/components/widgets/Event";
import Arrow from "@/assets/icons/arrow.svg";
import { Button } from "@/components/shared/Button";
import { Loader } from "@/components/shared/Loader";
import { CommentsList } from "@/components/widgets/CommentsList";
import classes from "./page.module.css";

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
            likes
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
                likes
            }
        }
    }
`;

const EventPage: NextPage<PageParams> = ({ params: { event_id } }) => {
    const { data, error, loading, refetch } = useQuery(GET_EVENT_BY_ID, { variables: { id: event_id } });

    //console.log("data", data);

    if (loading && !error) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={classes.eventPage}>
            <div className={classes.eventWrapper}>
                <Button className={classes.arrowButton} resetDefaultStyles={true}>
                    <Arrow />
                </Button>

                <Event event={data.event} />

                <CommentsList {...{ comments: data.comments, event_id, refetch }} />
            </div>
        </section>
    );
};

export default EventPage;
