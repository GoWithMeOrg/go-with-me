import classes from "./CardEvent.module.css";
import Image from "next/image";
import Link from "next/link";
import { Geocoding } from "@/components/widgets/GoogleMap/Geocoding";
import dayjs from "dayjs";
import Marker from "@/assets/icons/marker.svg";
import Clock from "@/assets/icons/clock.svg";

interface CardEventProps {
    id: string;
    name: string;
    description: string;
    coord: [number, number];
    startDate: string | Date | undefined;
    time: string | undefined;
    image?: string;
}

export const CardEvent = ({ id, name, description, coord, startDate, time, image }: CardEventProps) => {
    return (
        <div id={id} className={classes.card}>
            <div className={classes.imageContainer}>
                <div className={classes.image}>
                    {image && (
                        <Link href={`/events/${id}`}>
                            <Image src={image} alt="img" width={380} height={250} />
                        </Link>
                    )}
                </div>
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
            <Link href={`/events/${id}`}>
                <span className={classes.title}>{name}</span>
            </Link>

            <div className={classes.description}>{description}</div>
        </div>
    );
};

export default CardEvent;
