import React, { FC } from "react";
import gql from "graphql-tag";

import { Invation } from "@/components/widgets/Invation";
import { Application } from "@/components/shared/Application";

import { IEvent } from "@/database/models/Event";

import { useNotifications } from "./hooks";
import { ApplicationProps } from "@/components/shared/Application/Application";

import classes from "./Notifications.module.css";

export const Notifications: FC = () => {
    const { dataApplications, dataInvations } = useNotifications();

    return (
        <div className={classes.notificationsList}>
            {dataInvations?.map((invation: any) => (
                <Invation
                    key={invation.id}
                    id={invation.id}
                    eventId={invation.event._id}
                    name={invation.event?.name}
                    // coord={[location.coordinates[1], location.coordinates[0]]}
                    startDate={invation.event.startDate}
                    time={invation.event.time}
                    image={invation.event.image}
                    organizer={invation.event.organizer.name}
                    sender={invation.sender.name}
                    // status={invation.status}
                />
            ))}

            {dataApplications?.map((application: any) => (
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
