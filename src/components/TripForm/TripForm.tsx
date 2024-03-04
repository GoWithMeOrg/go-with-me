import { FC, FormEvent } from "react";
import dayjs from "dayjs";

import type { ITrip, ITripFromDB } from "@/database/models/Trip";

import classes from "./TripForm.module.css";
import gql from "graphql-tag";
import Link from "next/link";
import styles from "../TripForm/TripForm.module.css";

interface TripFormProps {
    tripData: ITripFromDB;
    onSubmit: (eventData: ITrip) => void;
}

const TripForm: FC<TripFormProps> = ({ tripData, onSubmit }) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        // Convert the form data to the correct types
        const onSubmitData: ITrip = {
            name: formData.name as string,
            description: formData.description as string,
            isPrivate: formData.isPrivate === "on",
            organizer_id: tripData.organizer_id,
            startDate: dayjs(formData.startDate as string).toISOString(),
            endDate: dayjs(formData.endDate as string).toISOString(),
        };
        onSubmit(onSubmitData);
    };

    console.log(tripData._id);

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <label className={classes.label}>
                    <span className={classes.titleField}>Trip Name:</span>
                    <input className={classes.input} type="text" name="name" defaultValue={tripData.name} required />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>Description:</span>
                    <textarea
                        rows={24}
                        name="description"
                        defaultValue={tripData.description}
                        className={classes.textarea}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>Start date:</span>
                    <input
                        type="date"
                        name="startDate"
                        defaultValue={dayjs(tripData.startDate).format("YYYY-MM-DD")}
                        className={classes.input}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.titleField}>End date:</span>
                    <input
                        type="date"
                        name="endDate"
                        defaultValue={dayjs(tripData.endDate).format("YYYY-MM-DD")}
                        className={classes.input}
                    />
                </label>

                <label className={classes.label}>
                    <span>Is private:</span>
                    <input type="checkbox" name="isPrivate" defaultChecked={tripData.isPrivate} />
                </label>

                <div>
                    <h3 className={styles.titleForm}>Events</h3>
                    {tripData.events?.map((event) => (
                        <div key={event._id}>
                            <ul className={styles.ul}>
                                <li>
                                    <Link href={`/events/${event._id}`}>{event.name}</Link>
                                </li>
                            </ul>
                        </div>
                    ))}
                    <button>
                        <Link
                            href={`/trips/search?tripId=${tripData._id}`}
                            style={{ color: "white", textDecoration: "none" }}
                        >
                            Добавить событие
                        </Link>
                    </button>
                </div>

                <button className={classes.button} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export { TripForm };
