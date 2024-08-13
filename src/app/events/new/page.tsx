"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, gql } from "@apollo/client";

import { EventForm } from "@/components/widgets/EventForm";
import { EventType } from "@/components/widgets/EventForm/EventForm";

import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";

import Arrow from "@/assets/icons/arrow.svg";

import classes from "./page.module.css";

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
        <div className={classes.createEventFormWrapper}>
            <Button className={classes.createEventButton} resetDefaultStyles={true}>
                <Arrow />
            </Button>

            <Title className={classes.createEventTitle} title="CREATE EVENT" tag={"h2"} />

            <EventForm eventData={{}} onSubmitEvent={handleCreateEvent} />
        </div>
    );
};

export default EventNewPage;
