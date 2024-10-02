"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";

import type { IEvent } from "@/database/models/Event";

import { EventForm } from "@/components/widgets/EventForm/EventForm";

import { Button } from "@/components/shared/Button";
import { Loader } from "@/components/shared/Loader";
import { Title } from "@/components/shared/Title";

import Arrow from "@/assets/icons/arrow.svg";
import classes from "../../new/page.module.css";

type PageParams = {
    params: { event_id: string };
};

const GET_EVENT = gql`
    query GetEvent($id: ID!) {
        event(id: $id) {
            _id
            organizer_id
            organizer {
                _id
                name
                email
                image
                emailVerified
            }
            name
            location {
                coordinates
                properties {
                    address
                }
            }
            description
            startDate
            endDate
            time
            status
            categories
            types
            tags
            image
        }
    }
`;

const UPDATE_EVENT = gql`
    #graphql
    mutation UpdateEvent($id: ID!, $event: EventInput!) {
        updateEvent(id: $id, event: $event) {
            name
            description
            status
            startDate
            endDate
            time
            categories
            types
            image
        }
    }
`;

const EventEditPage: NextPage<PageParams> = (context) => {
    const router = useRouter();
    const eventId = context.params.event_id;
    const { loading, error, data, refetch } = useQuery(GET_EVENT, {
        variables: { id: eventId },
    });
    const [updateEvent] = useMutation(UPDATE_EVENT);

    const handleEditEvent = (eventEdited: Partial<IEvent>) => {
        updateEvent({
            variables: {
                id: eventId,
                event: { ...eventEdited, organizer_id: data?.event?.organizer_id },
            },
        }).then((response) => {
            console.log("EventEditPage: ", response); // eslint-disable-line
            router.push(`/events/${eventId}`);
        });
        refetch();
    };

    return (
        <div className={classes.createEventFormWrapper}>
            <Button className={classes.createEventButton} resetDefaultStyles={true}>
                <Arrow />
            </Button>

            <Title className={classes.createEventTitle} title="EDIT EVENT" tag={"h2"} />

            {loading && <Loader />}
            {error && <p>Error : {error.message}</p>}

            {!error && data?.event && <EventForm eventData={data.event} onSubmitEvent={handleEditEvent} />}
        </div>
    );
};

export default EventEditPage;
