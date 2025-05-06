import React, { FC } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

import { Invation } from "@/components/widgets/Invation";
import { IEvent } from "@/database/models/Event";
import { SystemNotification } from "@/components/widgets/SystemNotification";

import classes from "./NotificationsList.module.css";
import { useSession } from "next-auth/react";
import { Application } from "@/components/shared/Application";

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

const GET_APPLICATIONS = gql`
    query GetApplications($userId: String) {
        getApplications(userId: $userId) {
            id
            receiver {
                _id
                name
            }
            sender {
                _id
                name
                image
            }
            status
        }
    }
`;

export const NotificationsList = () => {
    const { data: session, status } = useSession();
    const user_id = session?.user.id;
    const { data } = useQuery(GET_APPLICATIONS, {
        variables: {
            userId: user_id,
        },
    });

    console.log(data?.getApplications[0].id);

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
            {data && (
                <Application
                    id={data?.getApplications[0].id}
                    name={data?.getApplications[0]?.sender.name}
                    senderId={data?.getApplications[0]?.sender._id}
                    image={data?.getApplications[0]?.sender.image}
                    status={data?.getApplications[0]?.status}
                />
            )}
            {/* <SystemNotification /> */}
        </div>
    );
};

export default NotificationsList;
