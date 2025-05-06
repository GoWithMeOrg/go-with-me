import React, { FC } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import { Invation } from "@/components/widgets/Invation";
import { IEvent } from "@/database/models/Event";
import { SystemNotification } from "@/components/widgets/SystemNotification";

import classes from "./Notifications.module.css";
import { useSession } from "next-auth/react";
import { Application } from "@/components/shared/Application";
import { GET_APPLICATIONS } from "@/app/api/graphql/queries/applications";
import { useNotifications } from "./hooks";
import { ApplicationProps } from "@/components/shared/Application/Application";

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

export const Notifications = () => {
    const { dataApplications, refetch } = useNotifications();

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
