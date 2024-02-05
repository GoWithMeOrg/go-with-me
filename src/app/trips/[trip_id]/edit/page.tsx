"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";

import { EventForm } from "@/components/EventForm/EventForm";
import type { ITrip } from "@/database/models/Trip";

type PageParams = {
    params: { trip_id: string };
};

const GET_TRIP = gql`
    query GetTrip($id: ID!) {
        trip(id: $id) {
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
            events_id
            startDate
            endDate
        }
    }
`;

const UPDATE_TRIP = gql`
    #graphql
    mutation UpdateTrip($id: ID!, $trip: TripInput!) {
        updateTrip(id: $id, trip: $trip) {
            tripName
            description
            isPrivate
            startDate
            endDate
        }
    }
`;

const TripEditPage: NextPage<PageParams> = (context) => {
    const router = useRouter();
    const tripId = context.params.trip_id;
    const { loading, error, data } = useQuery(GET_TRIP, {
        variables: { id: tripId },
    });
    const [updateTrip] = useMutation(UPDATE_TRIP);
    console.log(data);

    const handleEdit = (eventEdited: Partial<ITrip>) => {
        updateTrip({
            variables: {
                id: tripId,
                event: eventEdited,
            },
        }).then((response) => {
            console.log("EventEditPage: ", response); // eslint-disable-line
            router.push(`/events/${tripId}`);
        });
    };

    return (
        <div className="EventEditPage">
            <h3>Edit Trip {data?.event?.tripName}</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}
            {!error && data?.trip && <EventForm event={data.trip} onSubmit={handleEdit} />}
        </div>
    );
};

export default TripEditPage;
