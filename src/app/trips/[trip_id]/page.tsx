"use client";

import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { gql, useQuery } from "@apollo/client";
import { Event } from "@/components/Event";

type PageParams = {
    params: { trip_id: string };
};

const GET_TRIP_BY_ID = gql`
    #graphql
    query GetTripById($id: ID!) {
        trip(id: $id) {
            _id
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

const TripPage: NextPage<PageParams> = (context) => {
    const { data: session } = useSession();
    const { data, error, loading } = useQuery(GET_TRIP_BY_ID, { variables: { id: context.params.trip_id } });
    console.log(data);

    if (loading && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="EventPage">
            <h3>Trip Page</h3>

            <Event event={data.trip} />
        </div>
    );
};

export default TripPage;
