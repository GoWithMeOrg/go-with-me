import React, { FC } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import { Invation } from "@/components/widgets/Invation";
import { IEvent } from "@/database/models/Event";
import { SystemNotification } from "@/components/widgets/SystemNotification";

import classes from "./NotificationsList.module.css";

export type EventListProps = {
    events?: IEvent[];
};

const GET_EVENTS = gql`
    query GetEvents {
        events {
            _id
            organizer {
                _id
                name
                email
                image
            }

            name
            description
            startDate
            endDate
            time
            location {
                type
                coordinates
                properties {
                    address
                }
            }
            image
        }
    }
`;

export const NotificationsList = () => {
    const { data } = useQuery(GET_EVENTS);

    return (
        <div className={classes.notificationsList}>
            {data?.events.map(({ _id, organizer, description, name, startDate, location, time, image }: IEvent) => (
                <Invation
                    key={_id}
                    id={_id}
                    name={name}
                    description={description}
                    coord={[location.coordinates[1], location.coordinates[0]]}
                    startDate={startDate}
                    time={time}
                    image={image}
                    organizer={organizer}
                />
            ))}

            <SystemNotification />
        </div>
    );
};

export default NotificationsList;
