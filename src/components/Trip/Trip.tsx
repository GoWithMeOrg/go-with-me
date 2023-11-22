import React, { FC } from "react";
import type { ITrip } from "@/database/models/Trip";
import { formatDate } from "@/utils/formatDate";

import classes from "@/components/EventForm/EventForm.module.css";

export interface TripProps {
    trip: ITrip;
}

const Trip: FC<TripProps> = ({ trip }) => {
    return (
        <div className={classes.component}>
            <h2 className={classes.header}>{trip.tripName}</h2>
            <div>Организатор: {trip.organizer.name}</div>
            <div>{trip.description}</div>
            <div>{formatDate(trip.startDate, "dd LLLL yyyy")}</div>
            <div>{formatDate(trip.endDate, "dd LLLL yyyy")}</div>
            {/* <div>{trip.isPrivate.valueOf()}</div> */}
        </div>
    );
};

export { Trip };
