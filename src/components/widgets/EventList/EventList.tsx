"use client";

import { FC } from "react";

import { useQuery } from "@apollo/client";

import type { IEvent } from "@/database/models/Event";
import { GET_EVENTS } from "@/app/api/graphql/queries/events";

import { CardEvent } from "../CardEvent";

import classes from "./EventList.module.css";
import { SizeCard } from "../CardEvent/CardEvent";
import { Backdrop } from "../Backdrop";

interface EventListProps {
    sizeCard: SizeCard;
    limit: number;
}

export const EventList: FC<EventListProps> = ({ sizeCard, limit }) => {
    const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
        variables: {
            limit: limit,
            offset: 0,
            sort: "startDate",
        },
    });

    console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <ul className={classes.list}>
            {data.events.map(({ _id, description, name, startDate, time, location, image }: IEvent) => (
                <li key={_id}>
                    <CardEvent
                        id={_id}
                        name={name}
                        description={description}
                        coord={[location.coordinates[0], location.coordinates[1]]}
                        startDate={startDate}
                        time={time}
                        image={image}
                        size={sizeCard}
                    />
                </li>
            ))}
        </ul>
    );
};
