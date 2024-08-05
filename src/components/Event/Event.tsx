import React, { FC, SetStateAction, useEffect, useState } from "react";
import type { IEvent } from "@/database/models/Event";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import Marker from "@/assets/icons/marker.svg";

import classes from "./Event.module.css";
import { TitleH2 } from "../TitleH2";
import { Geocoding } from "../GoogleMap";
import { Button } from "../Button";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import Popup from "../Popup/Popup";
import ArrowMaps from "@/assets/icons/arrowMaps.svg";
import dayjs from "dayjs";
import Checkbox from "@/assets/icons/checkbox.svg";
import Lock from "@/assets/icons/lock.svg";
import ShareLink from "@/assets/icons/shareLink.svg";
import Heart from "@/assets/icons/heart.svg";
import { TitleH3 } from "../TitleH3";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GuestList } from "../GuestList";
import { UserImage } from "../UserImage";

export interface EventProps {
    event: IEvent;
}

const Event: FC<EventProps> = ({ event }) => {
    const { data: session } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        event.location !== undefined
            ? {
                  lat: event.location?.coordinates[0],
                  lng: event.location.coordinates[1],
              }
            : null,
    );

    const [organizer, setOrganizer] = useState(true);
    useEffect(() => {
        //@ts-ignore
        setOrganizer(session?.user?.id === event.organizer_id);
        //@ts-ignore
    }, [event.organizer_id, session?.user?.id]);

    const coord: [number, number] = [event.location.coordinates[1] as number, event.location.coordinates[0] as number];

    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const dayOfWeek = dayjs(event.startDate).day();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[dayOfWeek];

    return (
        <div className={classes.event}>
            <div className={classes.eventWrapper}>
                <div className={classes.eventInfo}>
                    <TitleH2 title={event.name} className={classes.eventTitle} />

                    <div className={classes.location}>
                        <Marker style={{ transform: "scale(0.937)", marginRight: "0.5rem" }} />
                        <div className={classes.geocoding}>
                            <Geocoding coordinates={coord} />
                        </div>

                        <Button className={classes.buttonGoogleMaps} onClick={handleShowMap}>
                            <ArrowMaps style={{ marginRight: "0.25rem" }} />
                            {"Google maps"}
                        </Button>
                    </div>

                    <div className={classes.dateAndTime}>
                        <Checkbox style={{ transform: "scale(0.8)", marginRight: "0.5rem" }} />
                        {day} {dayjs(event.startDate).format("DD.MM.YY")} | {formatDate(event.time, "HH:mm")}
                    </div>

                    <div className={classes.eventStatus}>
                        <Lock style={{ transform: "scale(1.1)", marginRight: "0.5rem" }} />
                        <div className={classes.status}>{event.status}</div>
                        <div className={classes.buttonGoogleMaps}>
                            <ShareLink style={{ marginRight: "0.25rem", marginLeft: "0.88rem" }} />
                            <span>Share link</span>
                        </div>
                    </div>

                    <div className={classes.categories}>
                        <ul className={classes.selectedCategories}>
                            {event.types?.map((category, index) => (
                                <li key={index} className={classes.selectedCategory}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={classes.invitations}>
                        <div className={classes.invited}>
                            <div>50</div>
                            <span className={classes.text}>invited</span>
                        </div>

                        <div className={classes.invited}>
                            <div>26</div>
                            <span className={classes.text}>already joined</span>
                        </div>
                    </div>

                    {organizer ? (
                        <div className={classes.buttons}>
                            <Button className={classes.buttonEdit}>
                                <Link className={classes.buttonEditLink} href={`/events/${event._id}/edit`}>
                                    Edit
                                </Link>
                            </Button>
                            <Button className={classes.invite} text={"Invite"} />
                        </div>
                    ) : (
                        <div className={classes.buttons}>
                            <Button className={classes.join} text={"Join"} />
                            <Button className={classes.waitingList} text={"Waiting list"} />
                            <Button className={classes.favorite}>
                                <Heart />
                            </Button>
                        </div>
                    )}
                </div>
                <div className={classes.eventImage}>
                    <Image src={event.image ?? ""} width={680} height={480} alt="img" priority />
                </div>
                <Popup
                    {...{
                        showPopup,
                        setShowPopup,
                    }}
                    style={{ backgroundColor: "none", padding: "1rem", borderRadius: "0.5rem", width: "60%" }}
                >
                    <Map
                        style={{ height: "600px" }}
                        defaultZoom={14}
                        defaultCenter={{ lat: event.location?.coordinates[0], lng: event.location?.coordinates[1] }}
                        gestureHandling={"greedy"}
                        disableDefaultUI={false}
                        mapId={"<Your custom MapId here>"}
                    >
                        <AdvancedMarker
                            position={markerPosition}
                            // draggable={true}
                            title={"AdvancedMarker with customized pin."}
                        >
                            <Pin background={"#FBBC04"} borderColor={"#1e89a1"} glyphColor={"#0f677a"}></Pin>
                        </AdvancedMarker>
                    </Map>
                    <div className={classes.buttonBlockMap}>
                        <Button
                            className={classes.buttonMap}
                            onClick={() => setShowPopup(false)}
                            text={"Закрыть карту"}
                        />
                    </div>
                </Popup>
            </div>

            <div className={classes.descriptionAndOrganizer}>
                <TitleH3 title={"Description"} className={classes.description} />
                <div className={classes.eventDescription}>
                    <span className={classes.descriptionText}>{event.description}</span>

                    <div className={classes.eventOrganizer}>
                        <div className={classes.organizerImage}>
                            <UserImage className={classes.image} />
                        </div>

                        <div className={classes.organizerName}>
                            <span className={classes.name}>{event.organizer.name}</span>
                            <span className={classes.organizer}>Event Organizer</span>
                            <div className={classes.linkChat}>
                                <Link href={`/profile`} className={classes.link}>
                                    <ArrowMaps style={{ marginRight: "0.25rem" }} /> Chat
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Event };
