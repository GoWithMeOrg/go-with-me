import React, { FC } from "react";
import type { IEvent } from "@/database/models/Event";
import { formatDate } from "@/utils/formatDate";

import classes from "@/components/EventForm/EventForm.module.css";
import { Map } from "@/components/Map";

export interface EventProps {
    event: IEvent;
}

const Event: FC<EventProps> = ({ event }) => {
    return (
        <div className={classes.component}>
            <Map location={{ lat: 47.14758598529329, lng: 8.509962121063706 }} />

            <h2 className={classes.header}>{event.tripName}</h2>
            <div>Организатор: {event.organizer.name}</div>
            <div>{event.description}</div>
            <div>{formatDate(event.startDate, "dd LLLL yyyy")}</div>
            <div>{formatDate(event.endDate, "dd LLLL yyyy")}</div>
            <div>{event.isPrivate.valueOf()}</div>
        </div>
    );
};

export { Event };
