import { FC } from "react";

import { ITripFromDB } from "@/database/models/Trip";
import { formatDate } from "@/utils/formatDate";

import classes from "@/components/EventForm/EventForm.module.css";

export interface TripProps {
    tripData: ITripFromDB;
}

const Trip: FC<TripProps> = ({ tripData }) => {
    return (
        <div className={classes.component}>
            <h3 className={classes.header}>{tripData.name}</h3>
            <div>Организатор: {tripData.organizer.name}</div>
            <div>{tripData.description}</div>
            <div>{formatDate(tripData.startDate, "dd LLLL yyyy")}</div>
            <div>{formatDate(tripData.endDate, "dd LLLL yyyy")}</div>

            <div className={classes.eventsList}>
                <h6>Events:</h6>
                {tripData.events?.map((eventData) => <li key={eventData._id}>{eventData.name}</li>)}
            </div>
        </div>
    );
};

export { Trip };
