import React, { FC } from "react";
import type { IEvent } from "@/database/models/Event";

import classes from "@/components/EventForm/EventForm.module.css";

interface EventProps {
    event: IEvent;
}

const Event: FC<EventProps> = ({ event }) => {
    return (
        <div className={classes.component}>
            <h2 className={classes.header}>{event.tripName}</h2>
            <div>Организатор: {event.organizer.name}</div>
            <div>{event.description}</div>
            <div>{event.startDate?.toString()}</div>
            <div>{event.endDate?.toString()}</div>
            <div>{event.isPrivate.valueOf()}</div>
        </div>
    );
};

export { Event };
