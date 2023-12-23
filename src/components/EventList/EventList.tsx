"use client";

import { FC } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

import classes from "./EventList.module.css";
import type { IEvent } from "@/database/models/Event";
import { useQuery, gql, useMutation } from "@apollo/client";

type EventListProps = {
    events?: IEvent[];
};

const GET_EVENTS = gql`
    query GetEvents {
        events {
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
            isPrivate
            startDate
            endDate
            location {
                name
            }
        }
    }
`;

const DELETE_EVENT_MUTATION = gql`
    mutation DeleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            _id
        }
    }
`;

const EventList: FC<EventListProps> = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);
    const [deleteTripMutation] = useMutation(DELETE_EVENT_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleDelete = async (eventId: string) => {
        try {
            await deleteTripMutation({
                variables: { id: eventId },
            });

            // Обновляем страницу после успешного удаления
            location.reload();
        } catch (error) {
            console.error("Error deleting trip: ", error);
        }
    };

    return (
        <div className={classes.component}>
            <h3>Event List</h3>
            <ul>
                {data.events.map(({ _id, description, tripName, startDate, endDate, location }: IEvent) => (
                    <li key={_id} className={classes.item}>
                        <h3>
                            <Link className={classes.edit} href={`/events/${_id}`}>
                                {tripName}
                            </Link>
                        </h3>

                        <div className={classes.item}>{description}</div>

                        <div className={classes.locations}>
                            <strong>Locations:</strong>
                            <ul>
                                {location &&
                                    location.map((location) => (
                                        <li key={location.name} className={classes.item}>
                                            {location.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        <div className={classes.controls}>
                            <Link href={`/events/${_id}/edit`}>Редактировать</Link>
                            <button className={classes.delete} onClick={() => handleDelete(_id)}>
                                Удалить
                            </button>
                        </div>
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
                    </li>
                ))}
            </ul>
        </div>
    );
    {
        (" ");
    }
};

export { EventList };
