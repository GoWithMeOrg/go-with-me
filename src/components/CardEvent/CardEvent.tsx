import classes from "./CardEvent.module.css";
import Image from "next/image";
import Link from "next/link";
import Geocoding from "../GoogleMap/Geocoding";
import dayjs from "dayjs";
import Marker from "@/assets/icons/marker.svg";
import Clock from "@/assets/icons/clock.svg";
import profile from "../../assets/images/profile.png";

interface CardEventProps {
    id: string;
    name: string;
    description: string;
    coord: [number, number];
    startDate: string | Date | undefined;
    time: string | undefined;
}

export const CardEvent = ({ id, name, description, coord, startDate, time }: CardEventProps) => {
    return (
        <div id={id} className={classes.card}>
            <div className={classes.image}>
                <Link href={`/events/${id}`}>
                    <Image src={profile} alt="img" />
                </Link>
            </div>

            <div className={classes.location}>
                <Marker />
                <div className={classes.geocoding}>
                    <Geocoding coordinates={coord} />
                </div>
            </div>

            <div className={classes.date}>
                <Clock />
                <div className={classes.time}>
                    {dayjs(startDate).format("DD.MM.YY")} | {time}
                </div>
            </div>
            <div className={classes.title}>{name}</div>
            <div className={classes.description}>{description}</div>
        </div>
    );
};

export default CardEvent;
