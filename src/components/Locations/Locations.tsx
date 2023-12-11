"use client";

import { useState, FC } from "react";
import type { ILocation } from "@/database/models/Location";
import classes from "../EventForm/EventForm.module.css";
import { ITrip } from "@/database/models/Trip";

type LocationsProps = {
    episode: TripType;
    episode_id?: string;
    onSubmit: (trip: TripType) => void;
};

export type TripType = ITrip;

const Locations: FC<LocationsProps> = ({ episode, onSubmit }) => {
    const [episodeState, setEpisodeState] = useState(episode);
    const [newLocation, setNewLocation] = useState<string>("");

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLocation(event.target.value);
    };

    const addLocation = () => {
        setEpisodeState((prevState) => ({
            ...prevState,
            location: Array.isArray(prevState.location)
                ? [...prevState.location, { name: newLocation }]
                : [{ name: newLocation }],
        }));
    };

    return (
        <>
            <label className={classes.location}>
                <span className={classes.titleField}>Location:</span>
                {episodeState.location &&
                    episodeState.location.map((location, index) => <div key={index}>{location.name}</div>)}
                <input type="text" onChange={handleLocationChange} value={newLocation} className={classes.input} />
                <button type="button" onClick={addLocation} className={classes.btn}>
                    Add Location
                </button>
            </label>
        </>
    );
};

export { Locations };
