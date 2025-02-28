import React, { FC } from "react";

import { Title } from "@/components/shared/Title";
import { CardEvent } from "@/components/widgets/CardEvent";
import { IEvent } from "@/database/models/Event";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";
import { MoreLink } from "@/components/shared/MoreLink";

import { useEventListHome } from "./hook/useEventListHome";

import classes from "./EventListHome.module.css";
import { Backdrop } from "../Backdrop";

export interface EventListHomeProps {
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
            </div>

            <Backdrop>
                {data?.events.map(({ _id, description, name, startDate, location, time, image }: IEvent) => (
                    <CardEvent
                        key={_id}
                        id={_id}
                        name={name}
                        description={description}
                        coord={[location.coordinates[0], location.coordinates[1]]}
                        startDate={startDate}
                        time={time}
                        image={image}
                        size={sizeCard}
                    />
                ))}
            </Backdrop>

            {/* <Backdrop>
                <div className={classes.row}>
                    <div className={classes.card} />
                    <div className={classes.card} />
                    <div className={classes.card} />
                </div>
                <div className={classes.row}>
                    <div className={classes.card} />
                    <div className={classes.card} />
                    <div className={classes.card} />
                </div>
                <div className={classes.row}>
                    <div className={classes.card} />
                    <div className={classes.card} />
                    <div className={classes.card} />
                </div>
                <div className={classes.row}>
                    <div className={classes.card} />
                    <div className={classes.card} />
                    <div className={classes.card} />
                </div>
            </Backdrop> */}
            <MoreLink link={"/events"} text={"more events"} />
        </section>
    );
};

export default EventListHome;
