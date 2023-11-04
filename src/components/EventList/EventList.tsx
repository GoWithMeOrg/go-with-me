import { FC } from "react";
import Link from "next/link";

import classes from "./EventList.module.css";
import type { IEvent } from "@/database/models/Event";

type EventListProps = {
    events: IEvent[];
};

const EventList: FC<EventListProps> = ({ events }) => {
    return (
        <div className={classes.component}>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <div>organizerId: {event.organizerId.toString()}</div>
                        <div>
                            tripName: <Link href={`/events/${event.id}`}>{event.tripName}</Link>
                        </div>
                        <div>description: {event.description}</div>
                        <div>isPrivate: {event.isPrivate.toString()}</div>
                        <div>startDate: {event.startDate.toString()}</div>
                        <div>endDate: {event.endDate.toString()}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { EventList };
