"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";

import { EventForm } from "@/components/EventForm/EventForm";
import type { ITrip } from "@/database/models/Trip";
// import SearchEvent from "@/components/SearchEvent/SearchEvent";

type PageParams = {
    params: {
        trip_id: string;
    };
};

const GET_TRIP = gql`
    query GetTrip($id: ID!) {
        trip(id: $id) {
            _id
            organizer {
                _id
                name
                email
                image
            }
            name
            description
            events_id
            startDate
            endDate
        }
    }
`;

const UPDATE_TRIP = gql`
    mutation UpdateTrip($id: ID!, $trip: TripInput) {
        updateTrip(id: $id, trip: $trip) {
            _id
            organizer {
                _id
                name
                email
                image
            }
            name
            description
            events_id
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

    const handleEdit = (eventEdited: Partial<ITrip>) => {
        updateTrip({
            variables: {
                id: tripId,
                trip: eventEdited,
            },
        }).then((response) => {
            console.log("TripEditPage: ", response); // eslint-disable-line
            router.push(`/trips/${tripId}`);
        });
    };

    return (
        <div className="TripEditPage">
            <h3>Edit Trip {data?.trip?.name}</h3>
            {/* <SearchEvent tripId={tripId} organizerId={data?.trip?.organizer?._id} /> */}
            {loading && <p>Loading...</p>}
            {error && <p>Error : {error.message}</p>}
            {!error && data?.trip && <EventForm eventData={data.trip} onSubmit={handleEdit} />}
        </div>
    );
};

export default TripEditPage;
