import React, { FC, useState } from "react";
import classes from "../EventForm/EventForm.module.css";

import { ITrip } from "@/database/models/Trip";

export type TripType = ITrip;

interface TripFormProps {
    trip: TripType;
    onSubmit: (trip: TripType) => void;
}

const TripForm: FC<TripFormProps> = ({ trip, onSubmit }) => {
    const [eventState, setEventState] = useState<ITrip>(trip);

    const handleChanges = (trip: any) => {
        setEventState((prevState) => {
            return {
                ...prevState,
                [trip.target.name]: trip.target.type === "checkbox" ? trip.target.checked : trip.target.value,
            };
        });
    };

    const handleSubmit = (trip: any) => {
        trip.preventDefault();
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
                            /* defaultChecked={eventState.isPrivate} */
                        />
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

export { TripForm };
