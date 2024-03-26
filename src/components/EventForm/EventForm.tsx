import { FC, FormEvent, useRef, useState } from "react";
import dayjs from "dayjs";
import type { IEvent } from "@/database/models/Event";
import classes from "./EventForm.module.css";

import { Button } from "../Button";
import MarkerIcon from "../Marker/MarkerIcon";
import { APIProvider } from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "../GoogleMaps/PlaceAutocomplete";
import { Input } from "../Input";
import Popup from "../UI-kit/Popup/Popup";
import GoogleMap from "../GoogleMaps/GoogleMap";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
export type EventType = Partial<IEvent>;

interface EventFormProps {
    eventData: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
    ref?: React.RefObject<HTMLFormElement>;
}

const EventForm: FC<EventFormProps> = ({ eventData, onSubmit }) => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const originRef = useRef<HTMLInputElement>(null);
    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

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
                        <Button className={classes.btnFindMap} onClick={handleShowMap}>
                            <label className={classes.labelBtnFindMap}>Find on the Map</label>
                            <MarkerIcon />
                        </Button>
                    </div>
                    <APIProvider apiKey={API_KEY}>
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                            <Input ref={originRef} type={"text"} placeholder={"Найти ..."} />
                        </PlaceAutocomplete>
                    </APIProvider>
                    <Popup
                        {...{
                            showPopup,
                            setShowPopup,
                            //containerProps: { style: { backgroundColor: "rgba(172, 22, 22, 0.4)" } },
                        }}
                        style={{ backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem" }}
                    >
                        <GoogleMap />
                        {/* <APIProvider apiKey={API_KEY}>
                            {showPopup && (
                                <Map
                                    style={{ height: "600px" }}
                                    defaultZoom={3}
                                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                                    gestureHandling={"greedy"}
                                    disableDefaultUI={false}
                                    mapId={"<Your custom MapId here>"}
                                >
                                    <AdvancedMarker
                                        position={newPosition}
                                        title={"AdvancedMarker with customized pin."}
                                    >
                                        <Pin
                                            background={"#FBBC04"}
                                            borderColor={"#1e89a1"}
                                            glyphColor={"#0f677a"}
                                        ></Pin>
                                    </AdvancedMarker>
                                </Map>
                            )}

                            <CustomMapControl controlPosition={ControlPosition.TOP}>
                                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                                    <Input type={"text"} placeholder={"Найти ..."} />
                                </PlaceAutocomplete>
                            </CustomMapControl>
                            <MapHandler place={selectedPlace} />
                        </APIProvider>
                        */}
                        <button onClick={() => setShowPopup(false)}>закрыть карту</button>
                    </Popup>
                </label>

                <button className={classes.button} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export { EventForm };
