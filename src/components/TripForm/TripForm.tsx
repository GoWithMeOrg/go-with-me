import { FC, FormEvent, useEffect, useRef, useState } from "react";

import dayjs from "dayjs";

import type { ITrip, ITripFromDB } from "@/database/models/Trip";

import classes from "./TripForm.module.css";
import Link from "next/link";
import styles from "../TripForm/TripForm.module.css";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";

interface TripFormProps {
    tripData: ITripFromDB;
    onSubmit: (eventData: ITrip) => void;
}

const UPDATE_TRIP = gql`
    mutation UpdateTrip($id: ID!, $trip: TripInput) {
        updateTrip(id: $id, trip: $trip) {
            organizer {
                _id
            }
            name
            description
            startDate
            endDate
        }
    }
`;

const TripForm: FC<TripFormProps> = ({ tripData, onSubmit }) => {
    const [eventsList, setEventsList] = useState(tripData.events_id || []);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        // Convert the form data to the correct types
        const onSubmitData: ITrip = {
            name: formData.name as string,
            description: formData.description as string,
            isPrivate: formData.isPrivate === "on",
            organizer_id: tripData.organizer._id,
            startDate: dayjs(formData.startDate as string).toISOString(),
            endDate: dayjs(formData.endDate as string).toISOString(),
        };
        onSubmit(onSubmitData);
    };

    const [updateTrip] = useMutation(UPDATE_TRIP);
    const handleDelEvent = async (eventId: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let updatedEvents = eventsList?.filter((id) => id.toString() !== eventId);

        const { data } = await updateTrip({
            variables: {
                id: tripData?._id,
                trip: { events_id: updatedEvents, organizer_id: tripData.organizer._id },
            },
        });
        setEventsList(updatedEvents);
    };

    return (
        <div className={classes.container}>
            <div>
                <h3 className={styles.titleForm}>Events</h3>
                {tripData.events.map((event) => (
                    <div key={event._id}>
                        <ul className={styles.ul}>
                            <li>
                                <Link href={`/events/${event._id}`}>{event.name}</Link>
                            </li>
                        </ul>
                        <button onClick={(e) => handleDelEvent(event._id, e)}>remove event</button>
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

            <form className={classes.form} onSubmit={handleSubmit}>
                <label className={classes.label}>
                    <span className={classes.titleField}>Trip Name:</span>
                    <input className={classes.input} type="text" name="name" defaultValue={tripData.name} required />
                </label>

                {/* <label className={classes.label}>
                    <span className={classes.titleField}>Description:</span>
                    <textarea
                        rows={24}
                        name="description"
                        defaultValue={tripData.description}
                        className={classes.textarea}
                    />
                </label> */}

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

                <button className={classes.button} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export { TripForm };
