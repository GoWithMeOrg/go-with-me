"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";
import { Event } from "@/components/Event";

type PageParams = {
    params: { event_id: string };
};

const query = gql`
    #graphql
    query GetEvent($id: ID!) {
        event(id: $id) {
            organizer_id
            tripName
            description
            isPrivate
            startDate
            endDate
        }
    }
`;

const EventPage: NextPage<PageParams> = (context) => {
    const { data } = useSuspenseQuery(query, { variables: { id: context.params.event_id } });

    console.log("apollo GetEvent data: ", data); // eslint-disable-line

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
                console.log(response);
                setEvent(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            console.log("EventPage unmounted");
        };
    }, [context.params.event_id]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>EventPage</h3>

            <button
                onClick={() => {
                    setIsEditMode(!isEditMode);
                }}
            >
                {isEditMode ? "Cancel" : "Edit"}
            </button>

            {isEditMode ? <EventForm event={event} onSubmit={handleSaveEvent} /> : <Event event={event} />}
        </div>
    );
};

export default EventPage;
