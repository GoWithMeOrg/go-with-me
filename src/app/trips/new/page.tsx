"use client";
// It can be a server-side rendered page
// take a look how to pass sessions to the page in `src/app/events/page.tsx`

import type { NextPage } from "next";
import { useRouter } from "next/navigation";

import classes from "@/app/trips/Trips.module.css";
import { TripForm, TripType } from "@/components/TripForm/TripForm";

const TripNewPage: NextPage = () => {
    const router = useRouter();

    const handleCreateTrip = (trip: TripType) => {
        fetch(`/api/trips`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(trip),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                router.push(`/trips/${response.data.id}`);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className={classes.container}>
            <h1>Trip New Page</h1>
            <div className={classes.eventForm}>
                <TripForm
                    trip={{
                        // @ts-ignore TODO: fix type
                        organizer_id: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        tripName: "",
                        description: "",
                        startDate: undefined,
                        endDate: undefined,
                        isPrivate: false,
                    }}
                    onSubmit={handleCreateTrip}
                />
            </div>
        </div>
    );
};

export default TripNewPage;
