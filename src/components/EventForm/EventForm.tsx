import { FC, FormEvent, useContext, useRef, useState } from "react";
import dayjs from "dayjs";
import type { IEvent } from "@/database/models/Event";
import classes from "./EventForm.module.css";

import { Button } from "../Button";
import MarkerIcon from "../Marker/MarkerIcon";
import Autocomplete from "../GoogleMap/Autocomplete";
import { Input } from "../Input";
import Popup from "../Popup/Popup";
import { CustomMapControl, Geolocation, MapHandler } from "../GoogleMap";
import {
    Map,
    AdvancedMarker,
    Pin,
    useApiIsLoaded,
    APIProviderContext,
    ControlPosition,
} from "@vis.gl/react-google-maps";

export type EventType = Partial<IEvent>;

interface EventFormProps {
    eventData: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
    ref?: React.RefObject<HTMLFormElement>;
}

export const EventForm: FC<EventFormProps> = ({ eventData, onSubmit }) => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const apiIsLoaded = useApiIsLoaded();
    const mapAPI = useContext(APIProviderContext);

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const originRef = useRef<HTMLInputElement>(null);

    if (!apiIsLoaded || !mapAPI) {
        return;
    }

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
            location: {
                type: "Point",
                coordinates: [
                    selectedPlace?.geometry?.location?.lng() ?? 0,
                    selectedPlace?.geometry?.location?.lat() ?? 0,
                ],
                properties: {
                    address: selectedPlace?.formatted_address ?? "",
                },
            },
        };
        onSubmit(onSubmitData);
    };

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
                    <Autocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                        <Input id="location" type={"text"} placeholder={"Найти ..."} />
                    </Autocomplete>
                    <Popup
                        {...{
                            showPopup,
                            setShowPopup,
                        }}
                        style={{ backgroundColor: "none", padding: "1rem", borderRadius: "0.5rem", width: "60%" }}
                    >
                        <Map
                            style={{ height: "600px" }}
                            defaultZoom={3}
                            defaultCenter={{ lat: 22.54992, lng: 0 }}
                            gestureHandling={"greedy"}
                            disableDefaultUI={false}
                            mapId={"<Your custom MapId here>"}
                            onClick={(e) => {
                                setMarkerPosition(e.detail.latLng);
                            }}
                        >
                            <AdvancedMarker
                                position={markerPosition}
                                // draggable={true}
                                title={"AdvancedMarker with customized pin."}
                            >
                                <Pin background={"#FBBC04"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                            </AdvancedMarker>
                            <CustomMapControl controlPosition={ControlPosition.TOP}>
                                <Autocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                                    <Input type={"text"} placeholder={"Найти ..."} />
                                </Autocomplete>
                            </CustomMapControl>
                            <MapHandler place={selectedPlace} />
                        </Map>
                        <div className={classes.buttonBlockMap}>
                            <Geolocation />
                            <button onClick={() => setShowPopup(false)}>закрыть карту</button>
                        </div>
                    </Popup>
                </label>
                <button className={classes.button} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export default EventForm;
