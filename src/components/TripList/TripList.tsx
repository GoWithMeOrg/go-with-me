"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

import classes from "@/app/trips/Trips.module.css";
import type { ITrip } from "@/database/models/Trip";

type TripListProps = {
    trips: ITrip[];
};

const TripList: FC<TripListProps> = ({ trips }) => {
    const router = useRouter();

    const handleDelete = (trip: ITrip) => {
        if (confirm(`Вы уверены, что хотите удалить поездку ${trip.tripName}`)) {
            fetch(`/api/trips/${trip._id}`, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("data: ", data); // eslint-disable-line
                    router.refresh();
                })
                .catch((error) => {
                    console.log("error: ", error); // eslint-disable-line
                });
        }
    };

    return (
        <div className={classes.component}>
            <h3>Trip List</h3>
            <ul>
                {trips.map((trip) => (
                    <li key={trip._id} className={classes.item}>
                        <h3>
                            <Link className={classes.edit} href={`/trips/${trip._id}`}>
                                {trip.tripName}
                            </Link>
                        </h3>

                        <div className={classes.item}>{trip.description}</div>

                        <div className={classes.locations}>
                            <strong>Locations:</strong>
                            <ul>
                                {trip.location.map((location) => (
                                    <li key={location.name} className={classes.item}>
                                        {location.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={classes.dates}>
                            {trip.startDate && (
                                <div className={classes.item}>
                                    Start Date:
                                    {formatDate(trip.startDate, "dd LLLL yyyy")}
                                </div>
                            )}
                            {trip.endDate && (
                                <div className={classes.item}>
                                    endDate:
                                    {formatDate(trip.endDate, "dd LLLL yyyy")}
                                </div>
                            )}
                        </div>

                        <div className={classes.controls}>
                            <Link className={classes.btn} href={`/trips/${trip._id}/edit`}>
                                Edit
                            </Link>
                            <button className={classes.btn} onClick={() => handleDelete(trip)}>
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
