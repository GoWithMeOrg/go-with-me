"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, gql, useMutation } from "@apollo/client";

import { formatDate } from "@/utils/formatDate";
import { ITripFromDB } from "@/database/models/Trip";

import classes from "../TripList/TripList.module.css";

const GET_TRIPS = gql`
    query GetTrips {
        trips {
            _id
            organizer {
                _id
                name
                email
                image
            }
            name
            description
            startDate
            endDate
            events {
                _id
                name
                description
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

const TripList: FC = () => {
    const router = useRouter();
    const { loading, error, data: tripData, refetch } = useQuery(GET_TRIPS);
    const [deleteTripMutation] = useMutation(DELETE_TRIP_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleDelete = async (eventId: string) => {
        try {
            await deleteTripMutation({
                variables: { id: eventId },
            });

            router.refresh();
            await refetch();
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return (
        <div className={classes.component}>
            <h3>Trip List</h3>

            <ul>
                {tripData.trips.map(
                    ({ _id, description, name, startDate, endDate, organizer, events }: ITripFromDB) => (
                        <li key={_id} className={classes.item}>
                            <h3>
                                <Link className={classes.edit} href={`/trips/${_id}`}>
                                    {name}
                                </Link>
                            </h3>

                            <div className={classes.organizer}>{organizer.name}</div>

                            <div className={classes.description}>{description}</div>

                            <div className={classes.dates}>
                                {startDate && (
                                    <div>
                                        Start Date:
                                        {formatDate(startDate, "dd LLLL yyyy")}
                                    </div>
                                )}
                                {endDate && (
                                    <div>
                                        endDate:
                                        {formatDate(endDate, "dd LLLL yyyy")}
                                    </div>
                                )}
                            </div>

                            <ul>
                                {events.map((event) => (
                                    <li key={event._id}>
                                        <Link href={`/events/${event._id}`}>{event.name}</Link>
                                    </li>
                                ))}
                            </ul>

                            <div className={classes.controls}>
                                <Link href={`/trips/${_id}/edit`}>Редактировать</Link>
                                <button
                                    className={classes.delete}
                                    onClick={() => {
                                        confirm("Delete?") ? handleDelete(_id) : null;
                                    }}
                                >
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
};

export { TripList };
