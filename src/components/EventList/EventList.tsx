"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

import classes from "./EventList.module.css";
import type { IEvent } from "@/database/models/Event";

type EventListProps = {
    events: IEvent[];
};

const EventList: FC<EventListProps> = ({ events }) => {
    const router = useRouter();

    const handleDelete = (event: IEvent) => {
        if (confirm(`Вы уверены, что хотите удалить встречу ${event.tripName}`)) {
            fetch(`/api/events/${event._id}`, {
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
            <h3>Event List</h3>
            <ul>
                {events.map((event) => (
                    <li key={event._id} className={classes.item}>
                        <h3>
                            <Link className={classes.edit} href={`/events/${event._id}`}>
                                {event.tripName}
                            </Link>
                        </h3>

                        <div className={classes.item}>{event.description}</div>

                        <div className={classes.locations}>
                            <strong>Locations:</strong>
                            <ul>
                                {event.location &&
                                    event.location.map((location) => (
                                        <li key={location.name} className={classes.item}>
                                            {location.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        <div className={classes.controls}>
                            <Link href={`/events/${event._id}/edit`}>Редактировать</Link>
                            <button className={classes.delete} onClick={() => handleDelete(event)}>
                                Удалить
                            </button>
                        </div>
                        <div className={classes.dates}>
                            {event.startDate && (
                                <div>
                                    Start Date:
                                    {formatDate(event.startDate, "dd LLLL yyyy")}
                                </div>
                            )}
                            {event.endDate && (
                                <div>
                                    endDate:
                                    {formatDate(event.endDate, "dd LLLL yyyy")}
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
