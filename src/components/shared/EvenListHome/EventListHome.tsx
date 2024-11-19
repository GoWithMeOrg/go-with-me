import React, { FC, useState } from "react";

import { Title } from "../Title";
import { CardEvent } from "@/components/widgets/CardEvent";
import { IEvent } from "@/database/models/Event";
import { Button } from "../Button";

import ArrowCircle from "@/assets/icons/arrowCircle.svg";

import { Loader } from "../Loader";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { useEventListHome } from "./hook/useEventListHome";

import classes from "./EventListHome.module.css";
import Link from "next/link";
import { MoreLink } from "../MoreLink";

//         events {
//             _id
//             organizer {
//                 _id
//                 name
//                 email
//                 image
//             }

//             name
//             description
//             startDate
//             endDate
//             time
//             location {
//                 type
//                 coordinates
//                 properties {
//                     address
//                 }
//             }
//             image
//         }
//     }
// `;

interface EventListHomeProps {
    sizeCard: SizeCard;
}

export const EventListHome: FC<EventListHomeProps> = ({ sizeCard }) => {
    const { data, error, refetch } = useEventListHome();

    refetch();
    if (error) return <p>Error : {error.message}</p>;

    return (
        <section className={classes.cardsEvents}>
            <div className={classes.cardsEventsHeader}>
                <Title title={"Popular Event List"} tag={"h2"} />
                <div className={classes.cardsEventsHeaderLinks}>
                    <Link href={""} className={classes.cardsEventsHeaderLink}>
                        More
                    </Link>
                    <Link href={""} className={classes.cardsEventsHeaderLink}>
                        Map
                    </Link>
                </div>
            </div>

            <div className={classes.cardsEventsList}>
                {data?.events.map(({ _id, description, name, startDate, location, time, image }: IEvent) => (
                    <CardEvent
                        key={_id}
                        id={_id}
                        name={name}
                        description={description}
                        coord={[location.coordinates[1], location.coordinates[0]]}
                        startDate={startDate}
                        time={time}
                        image={image}
                        size={sizeCard}
                    />
                ))}
            </div>

            <MoreLink link={""} text={"more events"} />
        </section>
    );
};

export default EventListHome;
