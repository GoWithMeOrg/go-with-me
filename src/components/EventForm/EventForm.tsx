import React, { FC, FormEvent } from "react";
import dayjs from "dayjs";

import type { IEvent } from "@/database/models/Event";
import classes from "./EventForm.module.css";
import { ITrip } from "@/database/models/Trip";

export type EventType = Partial<IEvent>;

interface EventFormProps {
    event: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
}

const EventForm: FC<EventFormProps> = ({ event, onSubmit }) => {
    const handleSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        const formData = Object.fromEntries(new FormData(formEvent.currentTarget).entries());
        const onSubmitData: Partial<IEvent> = {
            organizer_id: event.organizer_id,
            tripName: formData.tripName as string,
            description: formData.description as string,
            isPrivate: formData.isPrivate === "on",
            startDate: dayjs(formData.startDate as string).toISOString(),
            endDate: dayjs(formData.endDate as string).toISOString(),
            locationName: formData.locationName as string,
        };
        onSubmit(onSubmitData);
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <label className={classes.label}>
                    <span className={classes.titleField}>Trip Name:</span>
                    <input
                        type="text"
                        name="tripName"
                        defaultValue={event.tripName}
                        required
                        className={classes.input}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>Description:</span>
                    <textarea
                        rows={24}
                        name="description"
                        defaultValue={event.description}
                        className={classes.textarea}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>Start date:</span>
                    <input
                        type="date"
                        name="startDate"
                        defaultValue={dayjs(event.startDate).format("YYYY-MM-DD")}
                        className={classes.input}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>End date:</span>
                    <input
                        type="date"
                        name="endDate"
                        defaultValue={dayjs(event.endDate).format("YYYY-MM-DD")}
                        className={classes.input}
                    />
                </label>

                <label className={classes.label}>
                    <span>Is private:</span>
                    <input type="checkbox" name="isPrivate" defaultChecked={event.isPrivate} />
                </label>

                <label className={classes.label}>
                    <span>location:</span>
                    <input type="text" defaultValue={event.locationName} className={classes.input} />
                </label>

                <button className={classes.button} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export { EventForm };
