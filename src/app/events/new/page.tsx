"use client";

import type { NextPage, NextPageContext } from "next";
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
                        tripName: "",
                        description: "",
                        startDate: "",
                        endDate: "",
                        isPrivate: false,
                        bannerImage: "",
                    }}
                    onSubmit={handleCreateEvent}
                />
            </div>
        </div>
    );
};

export default EventNewPage;
