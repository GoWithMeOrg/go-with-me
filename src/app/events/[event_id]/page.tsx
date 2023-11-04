"use client";

import type { NextPage, NextPageContext } from "next";

import { useEffect, useState } from "react";

import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";
import { Event } from "@/components/Event";

type PageParams = {
    params: { event_id: string };
};

const EventPage: NextPage<PageParams> = (context) => {
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
            .then((response) => response.json())
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
