"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import classes from "@/app/trips/Trips.module.css";
import { Comments } from "@/components/Comments";
import { TripForm, TripType } from "@/components/TripForm/TripForm";
import { Trip } from "@/components/Trip";

type PageParams = {
    params: { trip_id: string };
};

const query = gql`
    #graphql
    query GetTrip($id: ID!) {
        trip(id: $id) {
            organizer {
                _id
                name
                email
            }
            tripName
            description
            isPrivate
            startDate
            endDate
        }
        comments(event_id: $id) {
            _id
            author {
                _id
                name
                email
            }
            content
            createdAt
        }
    }
`;

const TripPage: NextPage<PageParams> = (context) => {
    const { data } = useSuspenseQuery(query, { variables: { id: context.params.trip_id } });

    //console.log("[client side] data: ", data); // eslint-disable-line

    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(false);
    const [trip, setTrip] = useState(null);

    const handleSaveEvent = (trip: TripType) => {
        fetch(`/api/trips/${context.params.trip_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(trip),
        })
            .then((response) => response.json())
            .then((response) => {
                //console.log(response);
                setIsEditMode(false);
                //setTrip(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        //console.log("TripPage mounted");

        fetch(`/api/trips/${context.params.trip_id}`)
            .then((response) => {
                if (!response.ok) {
                    switch (response.status) {
                        case 401:
                            router.push("/login");
                            break;
                        case 403:
                            router.push("/login");
                            break;
                        default:
                            throw new Error("Failed to fetch data");
                    }
                }
                return response.json();
            })
            .then((response) => {
                //console.log("REST", response);
                setTrip(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            console.log("TripPage unmounted");
        };
    }, [context.params.trip_id, router]);

    if (!trip) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.container}>
            <h3>TripPage</h3>

            <button
                className={classes.btn}
                onClick={() => {
                    setIsEditMode(!isEditMode);
                }}
            >
                {isEditMode ? "Cancel" : "Edit"}
            </button>

            {isEditMode ? <TripForm trip={trip} onSubmit={handleSaveEvent} /> : <Trip trip={trip} />}

            <h3>Comments</h3>
            <Comments event_id={context.params.trip_id} />
        </div>
    );
};

export default TripPage;
