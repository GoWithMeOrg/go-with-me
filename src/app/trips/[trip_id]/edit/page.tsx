"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";

import type { ITrip } from "@/database/models/Trip";
import { TripForm } from "@/components/TripForm";

type PageParams = {
    params: { trip_id: string };
};

const TripEditPage: NextPage<PageParams> = (context) => {
    const tripId = context.params.trip_id;
    const [trip, setTrip] = useState<ITrip>();

    const handleEdit = (tripEdited: ITrip) => {
        console.log("tripEdited: ", tripEdited); // eslint-disable-line
        fetch(`/api/trips/${tripId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tripEdited),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data); // eslint-disable-line
            })
            .catch((error) => {
                console.log("error: ", error); // eslint-disable-line
            });
    };

    useEffect(() => {
        fetch(`/api/events/${tripId}`)
            .then((response) => response.json())
            .then((response) => {
                setTrip(response.data);
            })
            .catch((error) => {
                console.log("error: ", error); // eslint-disable-line
            });
    }, [tripId]);

    return (
        <div>
            <h1>Edit Event</h1>
            {trip && <TripForm trip={trip} onSubmit={handleEdit} />}
        </div>
    );
};

export default TripEditPage;
