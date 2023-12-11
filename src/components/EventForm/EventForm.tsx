import React, { FC, useState } from "react";
import classes from "./EventForm.module.css";

import type { IEvent } from "@/database/models/Event";

export type EventType = IEvent;

interface EventFormProps {
    event: EventType;
    onSubmit: (event: EventType) => void;
}

const EventForm: FC<EventFormProps> = ({ event, onSubmit }) => {
    const [eventState, setEventState] = useState<IEvent>(event);
    const [newLocation, setNewLocation] = useState<string>("");

    const handleChanges = (event: any) => {
        setEventState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
            };
        });
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLocation(event.target.value);
    };

    const addLocation = () => {
        setEventState((prevState) => ({
            ...prevState,
            location: Array.isArray(prevState.location)
                ? [...prevState.location, { name: newLocation }]
                : [{ name: newLocation }],
        }));
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

                    <label className={classes.location}>
                        <span className={classes.titleField}>Location:</span>
                        {eventState.location &&
                            eventState.location.map((location, index) => <div key={index}>{location.name}</div>)}
                        <input
                            type="text"
                            onChange={handleLocationChange}
                            value={newLocation}
                            className={classes.input}
                        />
                        <button type="button" onClick={addLocation} className={classes.btn}>
                            Add Location
                        </button>
                    </label>

                    <label className={classes.label}>
                        <span>Banner Image:</span>
                        <input title="Comming soon!" disabled={true} type="file" accept=".jpg, .jpeg, .png" />
                    </label>

                    <button className={classes.btn}>Send</button>
                </form>
            </div>
        </>
    );
};

export { EventForm };
