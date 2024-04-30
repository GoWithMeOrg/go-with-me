import { FC, FormEvent, useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import type { IEvent } from "@/database/models/Event";
import Image from "next/image";
import classes from "./EventForm.module.css";

import { Button } from "../Button";
import Marker from "@/assets/icons/marker.svg";
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
import profile from "@/assets/images/profile.png";
import Plus from "@/assets/icons/plus.svg";
import Joined from "@/assets/icons/joined.svg";

export type EventType = Partial<IEvent>;

interface EventFormProps {
    eventData: EventType;
    onSubmit: (event: Partial<IEvent>) => void;
    ref?: React.RefObject<HTMLFormElement>;
}

export const EventForm: FC<EventFormProps> = ({ eventData, onSubmit }) => {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [time, setTime] = useState<string>(eventData.time ?? "00:00");
    //const [categories, setCategories] = useState<string>(eventData.category ?? "");
    const [eventStatus, setEventStatus] = useState<string>(eventData.status ?? "Public");

    const apiIsLoaded = useApiIsLoaded();
    const mapAPI = useContext(APIProviderContext);

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const originRef = useRef<HTMLInputElement>(null);

    //const eventCategory = ["Party", "Conference", "Concert", "Trip", "Workshops"];

    if (!apiIsLoaded || !mapAPI) {
        return;
    }

    //console.log(eventData.eventType);
    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    /* const selectedCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const button = e.currentTarget as HTMLButtonElement;
        setCategories(button.textContent as string);
    }; */

    // const timeM = document.getElementsByName("time") as NodeListOf<HTMLInputElement>;
    // const timeString = timeM[0]?.value;
    // console.log(typeof timeString);

    /* const setCheckedRadio = () => {
        const radioGroup = document.getElementsByName("eventRadio") as NodeListOf<HTMLInputElement>;
        for (const radio of radioGroup) {
            if (radio.value === eventStatus) {
                radio.checked = radio.value === eventStatus;
                radio.checked = true;
            }
        }
        //console.log(eventStatus);
    };
    setCheckedRadio(); */

    // console.log(time);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        const onSubmitData: Partial<IEvent> = {
            organizer_id: eventData.organizer?._id,
            name: formData.name as string,
            description: formData.description as string,
            startDate: dayjs(formData.startDate as string).toISOString(),
            endDate: dayjs(formData.endDate as string).toISOString(),
            time: (formData.time as string) ?? time,
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
            /* category: (formData.category as string) ?? categories, */
            status: (formData.status as string) ?? eventStatus,
        };
        onSubmit(onSubmitData);
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <label className={classes.label}>
                    <span className={classes.inputTitle}>Event title</span>
                    <input className={classes.input} type="text" name="name" defaultValue={eventData.name} required />
                </label>

                <label className={classes.label}>
                    <div className={classes.labelFindMap}>
                        <span className={classes.inputTitle}>Location/Address</span>
                        <Button className={classes.btnFindMap} onClick={handleShowMap}>
                            <label className={classes.labelBtnFindMap}>Find on the Map</label>
                            <Marker style={{ marginRight: "0.8rem" }} />
                        </Button>
                    </div>
                    <Autocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                        <Input
                            id="location"
                            type={"text"}
                            placeholder={""}
                            defaultValue={eventData.location?.properties?.address}
                        />
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
                                    <Input
                                        type={"text"}
                                        placeholder={"Найти ..."}
                                        defaultValue={eventData.location?.properties?.address}
                                    />
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

                <div className={classes.inputsDate}>
                    <label className={classes.label}>
                        <span className={classes.inputTitle}>Start date</span>
                        <input
                            type="date"
                            name="startDate"
                            defaultValue={dayjs(eventData.startDate).format("YYYY-MM-DD")}
                            className={classes.inputsDate}
                        />
                    </label>

                    <label className={classes.label}>
                        <span className={classes.inputTitle}>End date</span>
                        <input
                            type="date"
                            name="endDate"
                            defaultValue={dayjs(eventData.endDate).format("YYYY-MM-DD")}
                            className={classes.inputsDate}
                        />
                    </label>

                    <label className={classes.label}>
                        <span className={classes.inputTitle}>Start time</span>
                        <input
                            type="time"
                            name="time"
                            //defaultValue={time}
                            className={classes.inputsDate}
                            //onClick={(e) => setTime((e.target as HTMLInputElement).value)}
                            // onClick={(e) => {
                            //     const inputValue = setTime((e.target as HTMLInputElement).value);
                            //     console.log(inputValue);
                            // }}
                        />
                    </label>
                </div>

                <div className={classes.confidentiality}>
                    <span className={classes.inputTitle}>Confidentiality</span>

                    <div className={classes.confidentialityWrapper}>
                        <label className={classes.labelRadio}>
                            <span className={classes.spanRadio}>Public event</span>
                            <input
                                className={classes.inputRadio}
                                type="radio"
                                name="eventRadio"
                                value={"Public"}
                                onClick={() => setEventStatus("Public")}
                                defaultChecked
                            />
                        </label>
                        <label className={classes.labelRadio}>
                            <span className={classes.spanRadio}>By invation only</span>
                            <input
                                className={classes.inputRadio}
                                type="radio"
                                name="eventRadio"
                                value={"Invation"}
                                onClick={() => setEventStatus("Invation")}
                            />
                        </label>
                        <label className={classes.labelRadio}>
                            <span className={classes.spanRadio}>Private</span>
                            <input
                                className={classes.inputRadio}
                                type="radio"
                                name="eventRadio"
                                value={"Private"}
                                onClick={() => setEventStatus("Private")}
                            />
                        </label>
                    </div>
                </div>

                <label className={classes.label}>
                    <span className={classes.inputTitle}>Description</span>
                    <textarea
                        rows={8}
                        name="description"
                        defaultValue={eventData.description}
                        className={classes.textarea}
                    />
                </label>

                <label className={classes.label}>
                    <span className={classes.inputTitle}>Select category</span>
                    <select className={classes.categories}>
                        <option className={classes.buttonCategory} value="1">
                            category 1
                        </option>
                        <option className={classes.buttonCategory} value="2">
                            category 2
                        </option>
                        <option className={classes.buttonCategory} value="3">
                            category 3
                        </option>
                    </select>
                </label>

                <label className={classes.label}>
                    <span className={classes.inputTitle}>Tags</span>
                    <input className={classes.input} type="text" name="tags" />
                </label>

                <div className={classes.attendees}>
                    <h3 className={classes.attendeesTitle}>Attendees</h3>
                    <label className={classes.label}>
                        <span className={classes.inputTitle}>Choose member list</span>
                        <select className={classes.categories}>
                            <option className={classes.buttonCategory} value="1">
                                member 1
                            </option>
                            <option className={classes.buttonCategory} value="2">
                                member 2
                            </option>
                            <option className={classes.buttonCategory} value="3">
                                member 3
                            </option>
                        </select>
                    </label>

                    <label className={classes.label}>
                        <span className={classes.inputTitle}>Invite</span>
                        <select className={classes.categories}>
                            <option className={classes.buttonCategory} value="1">
                                invite 1
                            </option>
                            <option className={classes.buttonCategory} value="2">
                                invite 2
                            </option>
                            <option className={classes.buttonCategory} value="3">
                                invite 3
                            </option>
                        </select>

                        <div className={classes.user}>
                            <div className={classes.userWrapper}>
                                <Image
                                    style={{ height: "100%", borderRadius: "50%" }}
                                    width={50}
                                    height={50}
                                    src={profile}
                                    alt="img"
                                />
                                <span className={classes.userName}>Konstantin Raccoon</span>
                            </div>
                            <button className={classes.buttonPlus}>
                                <Plus />
                            </button>
                        </div>
                    </label>
                </div>

                <div className={classes.guestList}>
                    <span className={classes.guestListTitle}>Guest list</span>
                    <div className={classes.guestListWrapper}>
                        <div className={classes.guestListUser}>
                            <div className={classes.guestListUserImage}>
                                <Image
                                    style={{ height: "100%", objectFit: "cover", borderRadius: "50%", zIndex: "-1" }}
                                    width={100}
                                    src={profile}
                                    alt="img"
                                />
                            </div>

                            <span className={classes.questListUserName}>
                                Mike
                                <br />
                                Scoones
                            </span>
                            <span className={classes.guestListUserStatus}>joined</span>

                            <Joined />
                        </div>
                    </div>
                </div>

                <button className={classes.button} type="submit">
                    Save changes
                </button>
            </form>
        </div>
    );
};

export default EventForm;
