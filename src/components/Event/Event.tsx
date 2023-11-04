import React, { FC } from "react";
import classes from "@/components/EventForm/EventForm.module.css";

interface EventProps {
    event: {
        tripName: string;
        description: string;
        startDate: string;
        endDate: string;
        isPrivate: boolean;
        bannerImage: string;
    };
}

const Event: FC<EventProps> = ({ event }) => {
    return (
        <div className={classes.component}>
            <h2 className={classes.header}>{event.tripName}</h2>
            <div>{event.description}</div>
            <div>{event.startDate}</div>
            <div>{event.endDate}</div>
            <div>{event.isPrivate.valueOf()}</div>
        </div>
    );
};

export { Event };
