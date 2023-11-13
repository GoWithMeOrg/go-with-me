"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";

import { EventForm } from "@/components/EventForm/EventForm";
import type { IEvent } from "@/database/models/Event";

type PageParams = {
    params: { event_id: string };
};

const EventEditPage: NextPage<PageParams> = (context) => {
    const eventId = context.params.event_id;
    const [event, setEvent] = useState<IEvent>();

    const handleEdit = (eventEdited: IEvent) => {
        console.log("eventEdited: ", eventEdited); // eslint-disable-line
        fetch(`/api/events/${eventId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventEdited),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data); // eslint-disable-line
            })
            .catch((error) => {
                console.log("error: ", error); // eslint-disable-line
            });
    };

    useEffect(() => {
        fetch(`/api/events/${eventId}`)
            .then((response) => response.json())
            .then((response) => {
                setEvent(response.data);
            })
            .catch((error) => {
                console.log("error: ", error); // eslint-disable-line
            });
    }, [eventId]);

    return (
        <div>
            <h1>Edit Event</h1>
            {event && <EventForm event={event} onSubmit={handleEdit} />}
        </div>
    );
};

export default EventEditPage;
