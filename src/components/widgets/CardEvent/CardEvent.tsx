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
    size: SizeCard;
}

export const CardEvent = ({ id, name, description, coord, startDate, time, image, size }: CardEventProps) => {
    const imageSizes = {
        medium: { width: 440, height: 290 },
        "medium-large": { width: 380, height: 250 },
        large: { width: 350, height: 230 },
        "small-large": { width: 320, height: 210 },
        small: { width: 310, height: 200 },
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
            {(image && size && (
                <Link href={`/events/${id}`}>
                    <Image src={image} alt="img" width={imageSizes[size].width} height={imageSizes[size].height} />
                </Link>
            )) ||
                (!image && <div style={{ background: "#a4a7bc", height: `${imageSizes[size].height}px` }} />)}

            <div className={classes.details}>
                <div>
                    <Marker style={{ marginRight: "0.75rem" }} />
                    {coord && <Geocoding coordinates={coord} />}
                </div>

                <div>
                    <Clock style={{ marginRight: "0.75rem" }} />
                    {startDate && dayjs(startDate).format("DD.MM.YYYY")} {time && `| ${time}`}
                </div>
            </div>

            <div className={classes.descriptionWrapper}>
                <Link href={`/events/${id}`}>
                    <h3 className={classes.title}>{name}</h3>
                </Link>

                <p className={classes.description}>{description}</p>
            </div>
        </div>
    );
};

export default CardEvent;
