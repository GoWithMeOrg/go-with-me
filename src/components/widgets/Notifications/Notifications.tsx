import React, { FC } from "react";
import gql from "graphql-tag";

import { Invation } from "@/components/widgets/Invation";
import { Application } from "@/components/shared/Application";

import { IEvent } from "@/database/models/Event";

import { useNotifications } from "./hooks";
import { ApplicationProps } from "@/components/shared/Application/Application";

import classes from "./Notifications.module.css";

//TODO: исправить в типах user на receiver

export const Notifications: FC = () => {
    const { dataApplications, dataInvations } = useNotifications();

    return (
        <div className={classes.notificationsList}>
            {dataInvations?.map((invation: any) => (
                <Invation
                    key={invation.invitation.id}
                    id={invation.invitation.id}
                    eventId={invation.invitation.event._id}
                    name={invation.invitation.event?.name}
                    // coord={[location.coordinates[1], location.coordinates[0]]}
                    startDate={invation.invitation.event.startDate}
                    time={invation.invitation.event.time}
                    image={invation.invitation.event.image}
                    organizer={invation.invitation.event.organizer.name}
                    sender={invation.invitation.sender.name}
                    status={invation.status}
                    user_id={invation.user._id}
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
