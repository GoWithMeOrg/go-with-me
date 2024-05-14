import { FC, FormEvent, useContext, useRef, useState } from "react";
import dayjs from "dayjs";
import type { IEvent } from "@/database/models/Event";
import Image from "next/image";
import classes from "./EventForm.module.css";

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
import { CardUser } from "../CardUser";
import Arrow from "@/assets/icons/arrow.svg";
import { Dropdown } from "../Dropdown";
import { UploadFile } from "../UploadFile";
import Plus from "@/assets/icons/plus.svg";
import Minus from "@/assets/icons/minus.svg";

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
    const [categories, setCategories] = useState<string[]>(eventData.categories ?? []);
    const tagRef = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>(eventData.tags ?? []);

    enum EventStatus {
        PUBLIC = "public",
        INVATION = "invation",
        PRIVATE = "private",
    }

    const [eventStatus, setEventStatus] = useState<string>(eventData.status ?? EventStatus.PUBLIC);

    const apiIsLoaded = useApiIsLoaded();
    const mapAPI = useContext(APIProviderContext);

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const originRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (selectedImage: any) => {
        setImage(selectedImage);
    };

    const handleImageUrl = (selectedImageUrl: any) => {
        setImageUrl(selectedImageUrl);
    };

    if (!apiIsLoaded || !mapAPI) {
        return;
    }

    //console.log(eventData.categories);
    const handleCategoryChange = (selectedCategories: any) => {
        setCategories(selectedCategories);
    };

    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleAddTag = () => {
        if (!tagRef.current?.value) return;
        const tag = tagRef.current?.value;
        const updatedTags: Set<string> = new Set(tags);
        updatedTags.add(tag);
        setTags(Array.from(updatedTags));
        tagRef.current!.value = "";
    };

    const handleDeleteTag = (tag: string) => {
        setTags((prevSelectedTags) => {
            return prevSelectedTags.filter((cat) => cat !== tag);
        });
    };

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
                    //eventData.location?.coordinates[0] ??
                    selectedPlace?.geometry?.location?.lng() ?? 0,
                    //eventData.location?.coordinates[1] ??
                    selectedPlace?.geometry?.location?.lat() ?? 0,
                ],
                properties: {
                    address: selectedPlace?.formatted_address ?? "",
                },
            },
            image: imageUrl ?? eventData.image,
            status: (formData.status as string) ?? eventStatus,
            categories: categories,
            tags: tags,
        };
        onSubmit(onSubmitData);
    };

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.formWrapper}>
                    <label className={classes.label}>
                        <span className={classes.inputTitle}>Event title</span>
                        <input
                            className={classes.input}
                            type="text"
                            name="name"
                            defaultValue={eventData.name}
                            required
                        />
                    </label>

                    <label className={classes.label}>
                        <div className={classes.labelFindMap}>
                            <span className={classes.inputTitle}>Location/Address</span>
                            <button className={classes.btnFindMap} onClick={handleShowMap}>
                                Find on the Map
                                <Marker style={{ marginRight: "0.25rem" }} />
                            </button>
                        </div>
                        <Autocomplete onPlaceSelect={setSelectedPlace} originRef={originRef}>
                            <input
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
                                defaultValue={time ?? dayjs(eventData.time).format("HH:mm")}
                                className={classes.inputsDate}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className={classes.confidentiality}>
                        <span className={classes.inputTitle}>Confidentiality</span>

                        <div className={classes.confidentialityWrapper}>
                            <div className={classes.confidentialityRadio}>
                                <input
                                    type="radio"
                                    name="eventStatus"
                                    id="public"
                                    value={"Public"}
                                    onChange={() => setEventStatus(EventStatus.PUBLIC)}
                                    checked={eventStatus === "public"}
                                />
                                <label className={classes.labelRadio} htmlFor="public">
                                    Public event
                                </label>
                            </div>

                            <div className={classes.confidentialityRadio}>
                                <input
                                    type="radio"
                                    name="eventStatus"
                                    id="invation"
                                    value={"Invation"}
                                    onChange={() => setEventStatus(EventStatus.INVATION)}
                                    checked={eventStatus === "invation"}
                                />
                                <label className={classes.labelRadio} htmlFor="invation">
                                    By invation only
                                </label>
                            </div>

                            <div className={classes.confidentialityRadio}>
                                <input
                                    type="radio"
                                    name="eventStatus"
                                    id="private"
                                    value={"Private"}
                                    onChange={() => setEventStatus(EventStatus.PRIVATE)}
                                    checked={eventStatus === "private"}
                                />
                                <label className={classes.labelRadio} htmlFor="private">
                                    Private event
                                </label>
                            </div>
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

                    <div className={classes.label}>
                        <span className={classes.inputTitle}>Select category</span>
                        <Dropdown
                            textButton={"No category"}
                            className={classes.dropdownButton}
                            categoriesData={eventData.categories ?? []}
                            onSelectedCategories={handleCategoryChange}
                        />
                    </div>

                    <div className={classes.label}>
                        <span className={classes.inputTitle}>Select subject</span>
                        <Dropdown textButton={"No category"} className={classes.dropdownButton} categoriesData={[]} />
                    </div>

                    <label className={classes.labelTags}>
                        <span className={classes.inputTitle}>Create your tag</span>
                        <div className={classes.inputWrapper}>
                            <input className={classes.input} type="text" name="tag" ref={tagRef} />
                            <Plus transform="scale(0.83)" className={classes.tagButton} onClick={handleAddTag} />
                        </div>

                        <div className={classes.selectedTagsWrapper}>
                            <ul className={classes.selectedTags}>
                                {tags.map((tag, index) => (
                                    <li key={index} className={classes.selectedTag}>
                                        {tag}
                                        <Minus style={{ marginLeft: "0.5rem" }} onClick={() => handleDeleteTag(tag)} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </label>

                    <h3 className={classes.companionsTitle}>Companions</h3>
                    <div className={classes.label}>
                        <span className={classes.inputTitle}>Choose member list</span>
                        <Dropdown className={classes.dropdownButtonCompanions} categoriesData={[]} />
                    </div>

                    <div className={classes.label}>
                        <span className={classes.inputTitle}>Invite</span>
                        <Dropdown className={classes.dropdownButtonCompanions} categoriesData={[]} />
                    </div>

                    {/* <label className={classes.label}>
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
                    </label> */}

                    <div className={classes.guestList}>
                        <span className={classes.guestListTitle}>Guest list</span>
                        <div className={classes.guestListWrapper}>
                            <CardUser width={100} userName="Mike Scoones" status={"joined"} />
                            <CardUser width={100} userName="Mike Scoones" status={"invited"} />
                            <CardUser width={100} userName="Mike Scoones" status={"invited"} />
                            <CardUser width={100} userName="Mike Scoones" status={"joined"} />
                            <CardUser width={100} userName="Mike Scoones" status={"joined"} />
                        </div>
                        <div className={classes.questListArrow}>
                            <Arrow style={{ transform: "rotate(180deg)" }} />
                        </div>
                    </div>

                    <button className={classes.button} type="submit">
                        Save changes
                    </button>
                </div>

                <UploadFile onImageChange={handleImageChange} onImageUrl={handleImageUrl} imageUrl={eventData.image} />
            </form>
        </div>
    );
};

export default EventForm;
