import { FC, FormEvent } from "react";
import dayjs from "dayjs";

import type { IEvent } from "@/database/models/Event";

import classes from "./EventForm.module.css";
import { PlaceSearch } from "../GoogleMaps/PlaceSearch";
import { GoogleMaps } from "../GoogleMaps";

export type EventType = Partial<IEvent>;

interface EventFormProps {
    eventData: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
}

const EventForm: FC<EventFormProps> = ({ eventData, onSubmit }) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        const onSubmitData: Partial<IEvent> = {
            organizer_id: eventData.organizer?._id,
            name: formData.name as string,
            description: formData.description as string,
            isPrivate: formData.isPrivate === "on",
            startDate: dayjs(formData.startDate as string).toISOString(),
            endDate: dayjs(formData.endDate as string).toISOString(),
            locationName: formData.locationName as string,
        };
        onSubmit(onSubmitData);
        console.log(onSubmitData);
    };

    console.log(eventData);

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <label className={classes.label}>
                    <span className={classes.titleField}>Event Name:</span>
                    <input className={classes.input} type="text" name="name" defaultValue={eventData.name} required />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>Description:</span>
                    <textarea
                        rows={24}
                        name="description"
                        defaultValue={eventData.description}
                        className={classes.textarea}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>Start date:</span>
                    <input
                        type="date"
                        name="startDate"
                        defaultValue={dayjs(eventData.startDate).format("YYYY-MM-DD")}
                        className={classes.input}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>End date:</span>
                    <input
                        type="date"
                        name="endDate"
                        defaultValue={dayjs(eventData.endDate).format("YYYY-MM-DD")}
                        className={classes.input}
                    />
                </label>

                <label className={classes.label}>
                    <span>Is private:</span>
                    <input type="checkbox" name="isPrivate" defaultChecked={eventData.isPrivate} />
                </label>

                <label className={classes.label}>
                    <span>location:</span>
                    <input type="text" defaultValue={eventData.locationName} className={classes.input} />
                </label>

                <button className={classes.button} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export { EventForm };
