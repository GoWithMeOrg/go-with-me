"use client";

import { FC } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useQuery, gql, useMutation } from "@apollo/client";
import classes from "../TripList/TripList.module.css";
import { ITrip } from "@/database/models/Trip";

type TripListProps = {
    trips?: ITrip[];
};

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
            tripName
            description
            startDate
            endDate
            events {
                _id
                tripName
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

const TripList: FC<TripListProps> = () => {
    const { loading, error, data: tripData } = useQuery(GET_TRIPS);
    const [deleteTripMutation] = useMutation(DELETE_TRIP_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log("tripData: ", tripData); // eslint-disable-line

    const handleDelete = async (eventId: string) => {
        try {
            await deleteTripMutation({
                variables: { id: eventId },
            });

            location.reload();
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return (
        <div className={classes.component}>
            <h3>Trip List</h3>

            <ul>
                {tripData.trips.map(({ _id, description, tripName, startDate, endDate }: ITrip) => (
                    <li key={_id} className={classes.item}>
                        <h3>
                            <Link className={classes.edit} href={`/trips/${_id}`}>
                                {tripName}
                            </Link>
                        </h3>

                        <div className={classes.item}>{description}</div>

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
                ))}
            </ul>
        </div>
    );
};

export { TripList };
