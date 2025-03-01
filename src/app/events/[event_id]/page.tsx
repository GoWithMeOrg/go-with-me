"use client";

import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";

import { Event } from "@/components/widgets/Event";
import { CommentsList } from "@/components/widgets/CommentsList";

import { Button } from "@/components/shared/Button";
import { Loader } from "@/components/shared/Loader";

import Arrow from "@/assets/icons/arrow.svg";

import classes from "./page.module.css";
import { useParams } from "next/navigation";

interface PageProps {
    params: Promise<{ event_id: string }>;
}

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
                image
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
            tags
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

const EventPage: NextPage<PageProps> = () => {
    const params = useParams();

    const event_id = params.event_id as string;

    const { data, error, loading, refetch } = useQuery(GET_EVENT_BY_ID, { variables: { id: event_id } });

    if (loading && !error) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // console.log(data.comments.length < 15);
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
