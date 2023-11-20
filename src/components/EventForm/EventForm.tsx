import React, { FC, useState } from "react";
import classes from "./EventForm.module.css";
import { Map } from "@/components/Map";

import type { IEvent } from "@/database/models/Event";

export type EventType = IEvent;

interface EventFormProps {
    event: EventType;
    onSubmit: (event: EventType) => void;
}

const EventForm: FC<EventFormProps> = ({ event, onSubmit }) => {
    const [eventState, setEventState] = useState<IEvent>(event);

    const handleChanges = (event: any) => {
        setEventState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
            };
        });
    };

    const handleLocationChanges = (location: { lat: number; lng: number }) => {
        console.log("location: ", location); // eslint-disable-line
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit(eventState);
    };

    return (
        <>
            <div className={classes.container}>
                <h2 className={classes.titleForm}>Registration form</h2>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <label className={classes.label}>
                        <span className={classes.titleField}>Trip Name:</span>
                        <input
                            type="text"
                            onInput={handleChanges}
                            name="tripName"
                            value={eventState.tripName}
                            required
                            className={classes.input}
                        />
                    </label>

                    <label className={classes.label}>
                        <span className={classes.titleField}>Description:</span>
                        <textarea
                            rows={24}
                            onInput={handleChanges}
                            name="description"
                            defaultValue={eventState.description}
                            className={classes.textarea}
                        />
                    </label>

                    <label className={classes.label}>
                        <span className={classes.titleField}>Start date:</span>
                        <input
                            type="date"
                            onInput={handleChanges}
                            name="startDate"
                            defaultValue={eventState.startDate?.toString()}
                            className={classes.input}
                        />
                    </label>

                    <label className={classes.label}>
                        <span className={classes.titleField}>End date:</span>
                        <input
                            type="date"
                            onInput={handleChanges}
                            name="endDate"
                            defaultValue={eventState.endDate?.toString()}
                            className={classes.input}
                        />
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
                        <input title="Comming soon!" disabled={true} type="file" accept=".jpg, .jpeg, .png" />
                    </label>

                    <button className={classes.btn}>Send</button>
                </form>

                <Map location={event.location} onChange={handleLocationChanges} />
            </div>
        </>
    );
};

export { EventForm };
