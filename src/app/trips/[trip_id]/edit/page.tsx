"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { gql, useMutation } from "@apollo/client";

import type { ITrip } from "@/database/models/Trip";
import { TripForm } from "@/components/TripForm";

import classes from "@/app/trips/Trips.module.css";

const UPDATE_TRIP = gql`
    #graphql
    mutation UpdateTrip($id: ID!, $trip: TripInput!) {
        updateTrip(id: $id, trip: $trip) {
            _id
            tripName
            description
            isPrivate
            startDate
            endDate
        }
    }
`;

type PageParams = {
    params: { trip_id: string };
};

const TripEditPage: NextPage<PageParams> = (context) => {
    const tripId = context.params.trip_id;
    const [trip, setTrip] = useState<ITrip>();
    const [updateTrip] = useMutation(UPDATE_TRIP);

    const handleEdit = async (tripEdited: ITrip) => {
        const { data, errors } = await updateTrip({
            variables: {
                id: tripId,
                trip: {
                    organizer_id: tripEdited.organizer_id,
                    tripName: tripEdited.tripName,
                    description: tripEdited.description,
                    isPrivate: tripEdited.isPrivate,
                    startDate: tripEdited.startDate,
                    endDate: tripEdited.endDate,
                    location: tripEdited.location,
                },
            },
        });
        if (!errors) {
            setTrip(data.updateTrip);
        } else {
            console.log("errors: ", errors); // eslint-disable-line
        }
    };

    useEffect(() => {
        fetch(`/api/trips/${tripId}`)
            .then((response) => response.json())
            .then((response) => {
                setTrip(response.data);
            })
            .catch((error) => {
                console.log("error: ", error); // eslint-disable-line
            });
    }, [tripId]);

    return (
        <div className={classes.container}>
            <h1>Edit Trip</h1>
            {trip && <TripForm trip={trip} onSubmit={handleEdit} />}
        </div>
    );
};

export default TripEditPage;
