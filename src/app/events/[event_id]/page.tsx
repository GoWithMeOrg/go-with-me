"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";
import { Event } from "@/components/Event";
import { Comments } from "@/components/Comments";
import classes from "../new/EventNewPage.module.css";
import { Map } from "@/components/Map";

type PageParams = {
    params: { event_id: string };
};

const query = gql`
    #graphql
    query GetEvent($id: ID!) {
        event(id: $id) {
            organizer {
                _id
                name
                email
            }
            tripName
            description
            isPrivate
            startDate
            endDate
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
        }
    }
`;

const EventPage: NextPage<PageParams> = (context) => {
    const { data } = useSuspenseQuery(query, { variables: { id: context.params.event_id } });

    console.log("[client side] data: ", data); // eslint-disable-line

    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);
    const [event, setEvent] = useState(null);

    const handleSaveEvent = (event: EventType) => {
        fetch(`/api/events/${context.params.event_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setIsEditMode(false);
                setEvent(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        console.log("EventPage mounted");

        fetch(`/api/events/${context.params.event_id}`)
            .then((response) => {
                if (!response.ok) {
                    switch (response.status) {
                        case 401:
                            router.push("/login");
                            break;
                        case 403:
                            router.push("/login");
                            break;
                        default:
                            throw new Error("Failed to fetch data");
                    }
                }
                return response.json();
            })
            .then((response) => {
                console.log("REST", response);
                setEvent(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            console.log("EventPage unmounted");
        };
    }, [context.params.event_id, router]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.container}>
            <h3>EventPage</h3>

            <button
                className={classes.btn}
                onClick={() => {
                    setIsEditMode(!isEditMode);
                }}
            >
                {isEditMode ? "Cancel" : "Edit"}
            </button>

            {isEditMode ? <EventForm event={event} onSubmit={handleSaveEvent} /> : <Event event={event} />}

            <h3>Comments</h3>
            <Comments event_id={context.params.event_id} />
        </div>
    );
};

export default EventPage;
