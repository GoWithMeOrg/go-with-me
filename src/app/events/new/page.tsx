"use client";
// It can be a server-side rendered page
// take a look how to pass sessions to the page in `src/app/events/page.tsx`

import type { NextPage } from "next";
import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";

const EventNewPage: NextPage = () => {
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
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div>
            <h1>Event New Page</h1>
            <div>
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
