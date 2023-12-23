"use client";

import { FC } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

import classes from "@/app/trips/Trips.module.css";
import type { ITrip } from "@/database/models/Trip";
import { useQuery, gql, useMutation } from "@apollo/client";

type TripListProps = {
    trips?: ITrip[];
};

const GET_TRIPS = gql`
    query GetTrips {
        trips {
            _id
            tripName
            description
            startDate
            endDate
            location {
                name
            }
        }
    }
`;

const DELETE_TRIP_MUTATION = gql`
    mutation DeleteTrip($id: ID!) {
        deleteTrip(id: $id) {
            _id
        }
    }
`;

const TripList: FC<TripListProps> = () => {
    const { loading, error, data } = useQuery(GET_TRIPS);
    const [deleteTripMutation] = useMutation(DELETE_TRIP_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleDelete = async (tripId: string) => {
        try {
            await deleteTripMutation({
                variables: { id: tripId },
            });

            // Обновляем страницу после успешного удаления
            location.reload();
        } catch (error) {
            console.error("Error deleting trip: ", error);
        }
    };

    return (
        <div className={classes.component}>
            <h3>Trip List</h3>
            <ul>
                {data.trips.map(({ _id, description, tripName, startDate, endDate, location }: ITrip) => (
                    <li key={_id} className={classes.item}>
                        <h3>
                            <Link className={classes.edit} href={`/trips/${_id}`}>
                                {tripName}
                            </Link>
                        </h3>

                        <div className={classes.item}>{description}</div>

                        <div className={classes.locations}>
                            <strong>Locations:</strong>
                            <ul>
                                {location.map((location) => (
                                    <li key={location.name} className={classes.item}>
                                        {location.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={classes.dates}>
                            {startDate && (
                                <div className={classes.item}>
                                    Start Date:
                                    {formatDate(startDate, "dd LLLL yyyy")}
                                </div>
                            )}
                            {endDate && (
                                <div className={classes.item}>
                                    endDate:
                                    {formatDate(endDate, "dd LLLL yyyy")}
                                </div>
                            )}
                        </div>

                        <div className={classes.controls}>
                            <Link className={classes.btn} href={`/trips/${_id}/edit`}>
                                Edit
                            </Link>
                            <button className={classes.btn} onClick={() => handleDelete(_id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
    {
        (" ");
    }
};

export { TripList };
