import { FC, FormEvent, useRef, useState } from "react";
import dayjs from "dayjs";
import type { IEvent } from "@/database/models/Event";
import classes from "./EventForm.module.css";

import { Button } from "../Button";
import MarkerIcon from "../Marker/MarkerIcon";
import { APIProvider } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "../GoogleMap/PlaceAutocomplete";
import { Input } from "../Input";
import Popup from "../UI-kit/Popup/Popup";
import GoogleMap from "../GoogleMap/GoogleMap";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
export type EventType = Partial<IEvent>;

interface EventFormProps {
    eventData: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
    ref?: React.RefObject<HTMLFormElement>;
}

const EventForm: FC<EventFormProps> = ({ eventData, onSubmit }) => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    //const [showPopup, setShowPopup] = useState<boolean>(false);

    const originRef = useRef<HTMLInputElement>(null);
    // const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     setShowPopup(true);
    // };

    console.log(eventData);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        //console.log(formData);
        const onSubmitData: Partial<IEvent> = {
            organizer_id: eventData.organizer?._id,
            name: formData.name as string,
            description: formData.description as string,
            isPrivate: formData.isPrivate === "on",
            startDate: dayjs(formData.startDate as string).toISOString(),
            endDate: dayjs(formData.endDate as string).toISOString(),
            location: {
                type: "Point",
                coordinates: [
                    selectedPlace?.geometry?.location?.lng() ?? 0,
                    selectedPlace?.geometry?.location?.lat() ?? 0,
                ],
            },
        };
        onSubmit(onSubmitData);
        console.log(onSubmitData.location);
    };

    // let newPosition;
    // if (selectedPlace?.geometry && selectedPlace.geometry.location) {
    //     newPosition = {
    //         lat: selectedPlace.geometry.location.lat(),
    //         lng: selectedPlace.geometry.location.lng(),
    //     };
    // }

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
                    <div className={classes.labelFindMap}>
                        <span>location:</span>
                        <Button
                            className={classes.btnFindMap}
                            //onClick={handleShowMap}
                        >
                            <label className={classes.labelBtnFindMap}>Find on the Map</label>
                            <MarkerIcon />
                        </Button>
                    </div>
                    <APIProvider apiKey={API_KEY}>
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                            <Input id="location" type={"text"} placeholder={"Найти ..."} />
                        </PlaceAutocomplete>
                    </APIProvider>
                </label>

                <button className={classes.button} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export { EventForm };
