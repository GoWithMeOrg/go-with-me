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
import Arrow from "@/assets/icons/arrow.svg";
import { TitleH2 } from "@/components/TitleH2";
import { Button } from "@/components/Button";
import { EventHookForm } from "@/components/EventHookForm";

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
    //console.log(session); //данные сессии пользователя

    // const handleCreateEvent = async (event: EventType) => {
    //     createEvent({
    //         variables: {
    //             event: { ...event, organizer_id: organizerId },
    //         },
    //     }).then((response) => {
    //         router.push(`/events/${response.data?.createEvent?._id}`);
    //     });
    // };

    return (
        <div className={classes.container}>
            <div className={classes.createEventFormWrapper}>
                <Button className={classes.createEventButton}>
                    <Arrow />
                </Button>

                <TitleH2 className={classes.createEventTitle} title="CREATE EVENT" />
                {/* <EventForm
                    eventData={{
                        organizer_id: organizerId,
                        name: "",
                        description: "",
                        startDate: new Date(),
                        endDate: new Date(),
                    }}
                    onSubmit={handleCreateEvent}
                /> */}

                <EventHookForm />
            </div>
        </div>
    );
};

export default EventNewPage;
