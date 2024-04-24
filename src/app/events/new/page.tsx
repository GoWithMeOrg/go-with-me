"use client";
// It can be a server-side rendered page
// take a look how to pass sessions to the page in `src/app/events/page.tsx`

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, gql } from "@apollo/client";

import { EventForm } from "@/components/EventForm";
import type { EventType } from "@/components/EventForm";
import classes from "./page.module.css";
import Image from "next/image";
import rectangle from "@/assets/images/rectangle.png";

const CREATE_EVENT = gql`
    mutation CreateEvent($event: EventInput!) {
        createEvent(event: $event) {
            _id
        }
    }
`;

const EventNewPage: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [createEvent] = useMutation(CREATE_EVENT);
    const organizerId = (session?.user as { id: string })?.id;

    const handleCreateEvent = async (event: EventType) => {
        createEvent({
            variables: {
                event: { ...event, organizer_id: organizerId },
            },
        }).then((response) => {
            router.push(`/events/${response.data?.createEvent?._id}`);
        });
    };

    return (
        <div className="container">
            <h2 className={classes.createEventTitle}>CREATE EVENT</h2>
            <div className={classes.createEventFormWrapper}>
                <EventForm
                    eventData={{
                        organizer_id: organizerId,
                        name: "",
                        description: "",
                        startDate: new Date(),
                        endDate: new Date(),
                        /* isPrivate: true, */
                    }}
                    onSubmit={handleCreateEvent}
                />
                <div className={classes.createEventFormImage}>
                    <Image style={{ width: "100%" }} src={rectangle} alt="img" />
                    <button className={classes.createEventFormImageButton}>Update photo</button>
                </div>
            </div>
        </div>
    );
};

export default EventNewPage;
