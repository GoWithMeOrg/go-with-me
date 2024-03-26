"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, gql, useMutation } from "@apollo/client";

import { formatDate } from "@/utils/formatDate";
import type { IEvent } from "@/database/models/Event";

import classes from "./EventList.module.css";
import Popup from "../UI-kit/Popup/Popup";

const Asdf: FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(true);
    return (
        <>
            <button onClick={() => setShowPopup(true)}>открыть popup</button>
            <Popup {...{ showPopup, setShowPopup }}>
                <button onClick={() => setShowPopup(false)}>закрыть popup</button>
            </Popup>
        </>
    );
};

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
            }

            name
            description
            isPrivate
            startDate
            endDate
            locationName
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
    const router = useRouter();
    const { loading, error, data, refetch } = useQuery(GET_EVENTS);
    const [deleteEventMutation] = useMutation(DELETE_EVENT_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleDelete = async (eventId: string) => {
        try {
            await deleteEventMutation({
                variables: { id: eventId },
            });

            // Обновляем страницу после успешного удаления
            router.refresh();
            await refetch();
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return (
        <div className={classes.component}>
            <Asdf />
            <h3>Event List</h3>
            <ul>
                {data.events.map(({ _id, description, name, startDate, endDate, locationName }: IEvent) => (
                    <li key={_id} className={classes.item}>
                        <h3>
                            <Link className={classes.edit} href={`/events/${_id}`}>
                                {name}
                            </Link>
                        </h3>

                        <div className={classes.item}>{description}</div>

                        <div className={classes.locations}>{locationName}</div>

                        <div className={classes.controls}>
                            <Link href={`/events/${_id}/edit`}>Редактировать</Link>
                            <button
                                className={classes.delete}
                                onClick={() => {
                                    confirm("Delete?") ? handleDelete(_id) : null;
                                }}
                            >
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
};

export { EventList };
