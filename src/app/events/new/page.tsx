"use client";
// It can be a server-side rendered page
// take a look how to pass sessions to the page in `src/app/events/page.tsx`

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";

import classes from "@/app/events/Events.module.css";

const EventNewPage: NextPage = () => {
    const router = useRouter();

    const handleCreateEvent = (event: EventType) => {
        fetch(`/api/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                router.push(`/events/${response.data.id}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className={classes.container}>
            <h1>Event New Page</h1>
            <div className={classes.eventForm}>
                <EventForm
                    event={{
                        // @ts-ignore TODO: fix type
                        organizer_id: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        tripName: "",
                        description: "",
                        startDate: undefined,
                        endDate: undefined,
                        isPrivate: false,
                    }}
                    onSubmit={handleCreateEvent}
                />
            </div>
        </div>
    );
};

export default EventNewPage;
