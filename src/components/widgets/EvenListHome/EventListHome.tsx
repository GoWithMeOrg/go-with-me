import React, { FC } from "react";
import Link from "next/link";

import { Title } from "@/components/shared/Title";
import { CardEvent } from "@/components/widgets/CardEvent";
import { IEvent } from "@/database/models/Event";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { MoreLink } from "@/components/shared/MoreLink";

import { useEventListHome } from "./hook/useEventListHome";

import classes from "./EventListHome.module.css";

export interface EventListHomeProps {
    sizeCard: SizeCard;
}

export const EventListHome: FC<EventListHomeProps> = ({ sizeCard }) => {
    const { data, error, refetch } = useEventListHome();

    refetch();

    console.log("EventListHome: ", data);

    if (error) return <p>Error : {error.message}</p>;

    return (
        <section className={classes.cardsEvents}>
            <div className={classes.cardsEventsHeader}>
                <Title title={"Popular Event List"} tag={"h2"} />
                {/* <div className={classes.cardsEventsHeaderLinks}>
                    <Link href={""} className={classes.cardsEventsHeaderLink}>
                        More
                    </Link>
                    <Link href={""} className={classes.cardsEventsHeaderLink}>
                        Map
                    </Link>
                </div> */}
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

            <MoreLink link={"/events"} text={"more events"} />
        </section>
    );
};

export default EventListHome;