"use client";

import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";

import { Event } from "@/components/widgets/Event";
import { CommentsList } from "@/components/widgets/CommentsList";

import { useParams } from "next/navigation";
import { ButtonBack } from "@/components/shared/ButtonBack";
import Spinner from "@/assets/icons/spinner.svg";

import classes from "../page.module.css";
import { useSession } from "next-auth/react";
import { Backdrop } from "@/components/widgets/Backdrop";

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
    const { data: session, status } = useSession();

    const event_id = params.event_id as string;

    const { data, error, loading, refetch } = useQuery(GET_EVENT_BY_ID, { variables: { id: event_id } });

    refetch();

    if (loading && !error) {
        return <Spinner className={classes.spinner} />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={classes.event}>
            {status === "authenticated" && <ButtonBack />}

            <Backdrop marginTop={430} marginBottom={274} contentLoading={loading}>
                <Event event={data.event} />

                {status === "authenticated" && <CommentsList {...{ comments: data.comments, event_id, refetch }} />}
            </Backdrop>
        </section>
    );
};

export default EventPage;
