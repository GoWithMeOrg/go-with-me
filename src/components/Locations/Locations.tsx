"use client";

import { useEffect, useState, FC, ChangeEvent, FormEvent } from "react";
import type { ILocation } from "@/database/models/Location";
import classes from "../EventForm/EventForm.module.css";

type LocationsProps = {
    trip_id: string;
    onLocationsChange: (locations: ILocation[]) => void;
};

const saveLocation = (trip_id: string, content: string) => {
    return fetch(`/api/locations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, trip_id }),
    });
};

const getLocations = async (trip_id: string) => {
    try {
        const response = await fetch(`/api/locations?trip_id=${trip_id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch locations. Status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch locations");
    }
};

const Locations: FC<LocationsProps> = ({ trip_id, onLocationsChange }) => {
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [locationContent, setLocationContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputLocationContent = (event: ChangeEvent<HTMLInputElement>) => {
        setLocationContent(event.target.value);
    };

    useEffect(() => {
        getLocations(trip_id).then((locations) => {
            setLocations(locations);
        });
    }, [trip_id]);

    const handleSaveLocation = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        try {
            await saveLocation(trip_id, locationContent);
            const updatedLocations = await getLocations(trip_id);
            setLocations(updatedLocations);
            onLocationsChange(updatedLocations);
            setLocationContent("");
        } catch (error) {
            console.error(error);
            // Добавьте обработку ошибки, например, уведомление пользователей
        } finally {
            setLoading(false);
        }
    };

    //console.log(locations);

    return (
        <>
            <input
                type="text"
                name="locations"
                placeholder="Введите локацию"
                value={locationContent}
                onChange={handleInputLocationContent}
                className={classes.input}
            />
            {/* <button type="submit" onClick={handleSaveLocation} className={classes.btn}>
                Добавить
            </button> */}

            {/* <h6>Количество локаций: {locations.length}</h6> */}
        </>
    );
};

export { Locations };
