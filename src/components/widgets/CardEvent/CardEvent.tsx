import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import { Geocoding } from "@/components/widgets/GoogleMap/Geocoding";

import Marker from "@/assets/icons/marker.svg";
import Clock from "@/assets/icons/clock.svg";

import classes from "./CardEvent.module.css";

export enum SizeCard {
    M = "medium",
    ML = "medium-large",
    L = "large",
    SL = "small-large",
    S = "small",
}

interface CardEventProps {
    id: string;
    name: string;
    description: string;
    coord: [number, number];
    startDate: string | Date | undefined;
    time: string | undefined;
    image?: string;
    size?: SizeCard;
}

export const CardEvent = ({ id, name, description, coord, startDate, time, image, size }: CardEventProps) => {
    const imageSizes = {
        medium: { width: 444, height: 292 },
        "medium-large": { width: 380, height: 250 },
        large: { width: 354, height: 233 },
        "small-large": { width: 324, height: 213 },
        small: { width: 312, height: 205 },
    };

    const cardCssString = useMemo(
        () =>
            [
                classes.card,
                size === "medium" && classes.medium,
                size === "medium-large" && classes.mediumLarge,
                size === "large" && classes.large,
                size === "small-large" && classes.smallLarge,
                size === "small" && classes.small,
            ]
                .filter(Boolean)
                .join(" "),
        [size],
    );

    return (
        <div id={id} className={cardCssString}>
            {image && size && (
                <Link href={`/events/${id}`}>
                    <Image src={image} alt="img" width={imageSizes[size].width} height={imageSizes[size].height} />
                </Link>
            )}

            <div className={classes.location}>
                <Marker style={{ marginRight: "0.75rem" }} />
                <Geocoding coordinates={coord} />
            </div>

            <div className={classes.date}>
                <Clock style={{ marginRight: "0.75rem" }} />
                {dayjs(startDate).format("DD.MM.YY")} | {time}
            </div>

            <Link href={`/events/${id}`}>
                <h3 className={classes.title}>{name}</h3>
            </Link>

            <p className={classes.description}>{description}</p>
        </div>
    );
};

export default CardEvent;
