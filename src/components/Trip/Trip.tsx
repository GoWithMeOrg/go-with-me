import { FC } from "react";
import { EventProps } from "../Event/Event";
import classes from "@/components/EventForm/EventForm.module.css";

const Trip: FC<EventProps> = ({ event }) => {
    return (
        <div className={classes.component}>
            <h3 className={classes.header}>{event.tripName}</h3>
        </div>
    );
};
