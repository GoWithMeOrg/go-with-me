import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import type { IEvent } from "@/database/models/Event";
import { formatDate } from "@/utils/formatDate";
import { Title } from "@/components/shared/Title";
import { Geocoding } from "@/components/widgets/GoogleMap/Geocoding";
import { Button } from "@/components/shared/Button";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Popup } from "@/components/shared/Popup";
import { Badges } from "@/components/shared/Badges";
import ArrowMaps from "@/assets/icons/arrowMaps.svg";
import dayjs from "dayjs";
import Checkbox from "@/assets/icons/checkbox.svg";
import Lock from "@/assets/icons/lock.svg";
import ShareLink from "@/assets/icons/shareLink.svg";
import Heart from "@/assets/icons/heart.svg";
import Marker from "@/assets/icons/marker.svg";

import { Sizes } from "@/components/shared/Badges/Badges";
import { Avatar } from "@/components/shared/Avatar";

import classes from "./Event.module.css";

export interface EventProps {
    event: IEvent;
}

const Event: FC<EventProps> = ({ event }) => {
    const { data: session } = useSession();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(
        event.location !== undefined
            ? {
                  lat: event.location?.coordinates[1],
                  lng: event.location.coordinates[0],
              }
            : null,
    );

    const [organizer, setOrganizer] = useState(true);
    useEffect(() => {
        //@ts-ignore
        setOrganizer(session?.user?.id === event.organizer_id);
        //@ts-ignore
    }, [event.organizer_id, session?.user?.id]);

    const coord: [number, number] = [event.location.coordinates[0] as number, event.location.coordinates[1] as number];

    const handleShowMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const dayOfWeek = dayjs(event.startDate).day();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[dayOfWeek];

    console.log(event);

    return (
        <div className={classes.event}>
            <div className={classes.eventWrapper}>
                <div className={classes.eventInfo}>
                    <Title title={event.name} className={classes.eventTitle} tag={"h2"} />

                    <div className={classes.location}>
                        <Marker style={{ transform: "scale(0.937)", marginRight: "0.5rem" }} />
                        <div className={classes.geocoding}>
                            <Geocoding coordinates={coord} />
                        </div>

                        <Button className={classes.buttonGoogleMaps} onClick={handleShowMap} resetDefaultStyles={true}>
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

                    <Badges badges={event.types || []} size={Sizes.SMALL} />

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
                            <Button className={classes.invite}>Invite</Button>
                        </div>
                    ) : (
                        <div className={classes.buttons}>
                            <Button className={classes.join}>Join</Button>
                            <Button className={classes.waitingList}>Waiting list</Button>
                            <Button className={classes.favorite}>
                                <Heart />
                            </Button>
                        </div>
                    )}
                </div>
                <div className={classes.eventImage}>
                    {event.image && <Image src={event.image} width={680} height={480} alt="img" priority />}
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
                        defaultCenter={{ lat: event.location?.coordinates[1], lng: event.location?.coordinates[0] }}
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
                        <Button className={classes.buttonMap} onClick={() => setShowPopup(false)}>
                            Закрыть карту
                        </Button>
                    </div>
                </Popup>
            </div>

            <div className={classes.descriptionAndOrganizer}>
                <Title title={"Description"} className={classes.description} tag={"h3"} />
                <div className={classes.eventDescription}>
                    <span className={classes.descriptionText}>{event.description}</span>

                    <div className={classes.eventOrganizer}>
                        <div className={classes.organizerImage}>
                            <Avatar image={event.organizer?.image} name={event.organizer?.name} scale={2.7} />
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
