import React, { FC } from "react";
import type { IEvent } from "@/database/models/Event";
import { formatDate } from "@/utils/formatDate";

import classes from "@/components/EventForm/EventForm.module.css";

export interface EventProps {
    event: IEvent;
}

const Event: FC<EventProps> = ({ event }) => {
    return (
        <div className={classes.component}>
            <h3 className={classes.header}>{event.name}</h3>
            <div>Организатор: {event.organizer ? event.organizer.name : "Нет информации"}</div>
            <div>{event.description}</div>
            <div>{formatDate(event.startDate, "dd LLLL yyyy")}</div>
            <div>{formatDate(event.endDate, "dd LLLL yyyy")}</div>
            {/* {event.isPrivate && <div>{event.isPrivate.valueOf()}</div>} */}
        </div>
    );
};

export { Event };
