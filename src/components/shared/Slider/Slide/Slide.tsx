import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import { Geocoding } from "@/components/widgets/GoogleMap/Geocoding";
import { Title } from "@/components/shared/Title";

import Marker from "@/assets/icons/marker.svg";
import Checkbox from "@/assets/icons/checkbox.svg";

import classes from "./Slide.module.css";

export interface SlideProps {
    key: string;
    id: string;
    name: string;
    image: string;
    coord: [number, number];
    startDate: Date;
    time: string;
}

export const Slide: FC<SlideProps> = ({ id, name, image, coord, startDate, time }) => {
    return (
        <div className={classes.slide}>
            <Link href={`/events/${id}`}>
                <Image src={image} alt={name} width={580} height={408} priority style={{ objectFit: "cover" }} />
            </Link>

            <div className={classes.content}>
                <Title tag={"h3"} title={name} className={classes.title} />

                <div className={classes.details}>
                    <div>
                        <Marker style={{ marginRight: "0.75rem", fill: "#e3ef41", transform: "scale(0.94)" }} />
                        <Geocoding coordinates={coord} />
                    </div>
                    <div>
                        <Checkbox style={{ marginRight: "0.75rem", fill: "#e3ef41", transform: "scale(0.8)" }} />
                        {startDate && dayjs(startDate).format("DD.MM.YYYY")} {time && `| ${time}`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;
