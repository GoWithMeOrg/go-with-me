import React, { FC } from "react";
import gql from "graphql-tag";

import { Invation } from "@/components/widgets/Invation";
import { Application } from "@/components/shared/Application";

import { IEvent } from "@/database/models/Event";

import { useNotifications } from "./hooks";
import { ApplicationProps } from "@/components/shared/Application/Application";

import classes from "./Notifications.module.css";

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

export const Notifications: FC = () => {
    const { dataApplications } = useNotifications();

    // console.log(dataApplications[0]?.name);
    return (
        <div className={classes.notificationsList}>
            {/* {data?.events.map(({ _id, organizer, description, name, startDate, location, time, image }: IEvent) => (
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
            ))} */}

            {dataApplications &&
                dataApplications.map((application: any) => (
                    <Application
                        key={application.id}
                        id={application.id}
                        name={application.sender.name}
                        senderId={application.sender._id}
                        image={application.sender.image}
                        status={application.status}
                    />
                ))}
            {/* <SystemNotification /> */}
        </div>
    );
};
