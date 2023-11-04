import React, { FC, useState } from "react";
import classes from "./EventForm.module.css";

export type EventType = {
    tripName: string;
    description: string;
    startDate: string;
    endDate: string;
    isPrivate: boolean;
    bannerImage: string;
};

interface EventFormProps {
    event: EventType;
    onSubmit: (event: EventType) => void;
}

const EventForm: FC<EventFormProps> = ({ event, onSubmit }) => {
    const [eventState, setEventState] = useState(event);

    const handleChanges = (event: any) => {
        setEventState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            };
        });
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit(eventState);
    };

    return (
        <div className={classes.component}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h2 className={classes.header}>Registration form</h2>

                <label className={classes.label}>
                    <span>Trip Name:</span>
                    <input type="text" onInput={handleChanges} name="tripName" value={eventState.tripName} required />
                </label>

                <label className={classes.label}>
                    <span>Description:</span>
                    <textarea
                        rows={24}
                        onInput={handleChanges}
                        name="description"
                        defaultValue={eventState.description}
                    />
                </label>

                <label className={classes.label}>
                    <span>Start date:</span>
                    <input type="date" onInput={handleChanges} name="startDate" defaultValue={eventState.startDate} />
                </label>

                <label className={classes.label}>
                    <span>End date:</span>
                    <input type="date" onInput={handleChanges} name="endDate" defaultValue={eventState.endDate} />
                </label>

                <label className={classes.label}>
                    <span>Is private:</span>
                    <input
                        type="checkbox"
                        onInput={handleChanges}
                        name="isPrivate"
                        defaultChecked={eventState.isPrivate}
                    />
                </label>

                <label className={classes.label}>
                    <span>Banner Image:</span>
                    <input
                        title="Comming soon!"
                        disabled={true}
                        type="file"
                        name={event.bannerImage}
                        accept=".jpg, .jpeg, .png"
                    />
                </label>

                <button className={classes.button}>Send</button>
            </form>
        </div>
    );
};

export { EventForm };
