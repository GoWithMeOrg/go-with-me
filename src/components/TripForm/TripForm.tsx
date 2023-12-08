import React, { FC, useState } from "react";
import classes from "../EventForm/EventForm.module.css";

import { ITrip } from "@/database/models/Trip";
import mongoose from "mongoose";

export type TripType = ITrip;

interface TripFormProps {
    trip: TripType;
    onSubmit: (trip: TripType) => void;
}

const TripForm: FC<TripFormProps> = ({ trip, onSubmit }) => {
    const [tripState, setTripState] = useState(trip);
    const [newLocation, setNewLocation] = useState<string>("");

    const handleChanges = (trip: any) => {
        setTripState((prevState) => {
            return {
                ...prevState,
                [trip.target.name]: trip.target.type === "checkbox" ? trip.target.checked : trip.target.value,
            };
        });
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLocation(event.target.value);
    };

    const addLocation = () => {
        setTripState((prevState) => ({
            ...prevState,
            location: Array.isArray(prevState.location)
                ? [...prevState.location, { name: newLocation }]
                : [{ name: newLocation }],
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(tripState);
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
                            value={tripState.tripName}
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
                            defaultValue={tripState.description}
                            className={classes.textarea}
                        />
                    </label>

                    <label className={classes.label}>
                        <span className={classes.titleField}>Start date:</span>
                        <input
                            type="date"
                            onInput={handleChanges}
                            name="startDate"
                            defaultValue={tripState.startDate?.toString()}
                            className={classes.input}
                        />
                    </label>

                    <label className={classes.label}>
                        <span className={classes.titleField}>End date:</span>
                        <input
                            type="date"
                            onInput={handleChanges}
                            name="endDate"
                            defaultValue={tripState.endDate?.toString()}
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
                        <span className={classes.titleField}>Location:</span>
                        {tripState.location &&
                            tripState.location.map((location, index) => <div key={index}>{location.name}</div>)}
                        <input
                            type="text"
                            onChange={handleLocationChange}
                            value={newLocation}
                            className={classes.input}
                        />
                        <button type="button" onClick={addLocation}>
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

export { TripForm };
