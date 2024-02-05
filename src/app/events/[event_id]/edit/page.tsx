"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";

import { EventForm } from "@/components/EventForm/EventForm";
import type { IEvent } from "@/database/models/Event";

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

            tripName
            description
            isPrivate
            startDate
            endDate
            locationName
        }
    }
`;

const UPDATE_EVENT = gql`
    #graphql
    mutation UpdateEvent($id: ID!, $event: EventInput!) {
        updateEvent(id: $id, event: $event) {
            tripName
            description
            isPrivate
            startDate
            endDate
            locationName
        }
    }
`;

const EventEditPage: NextPage<PageParams> = (context) => {
    const router = useRouter();
    const eventId = context.params.event_id;
    const { loading, error, data } = useQuery(GET_EVENT, {
        variables: { id: eventId },
    });
    const [updateEvent] = useMutation(UPDATE_EVENT);
    console.log(data);

    const handleEdit = (eventEdited: Partial<IEvent>) => {
        updateEvent({
            variables: {
                id: eventId,
                event: eventEdited,
            },
        }).then((response) => {
            console.log("EventEditPage: ", response); // eslint-disable-line
            router.push(`/events/${eventId}`);
        });
    };

    return (
        <div className="EventEditPage">
            <h3>Edit Event {data?.event?.tripName}</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}
            {!error && data?.event && <EventForm event={data.event} onSubmit={handleEdit} />}
        </div>
    );
};

export default EventEditPage;
