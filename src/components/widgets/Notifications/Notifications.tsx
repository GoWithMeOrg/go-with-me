import React, { FC } from "react";

import { Application } from "@/components/shared/Application";

import { useNotifications } from "./hooks";

import { Invitation } from "@/components/widgets/Invitation";

import classes from "./Notifications.module.css";
//TODO: исправить в типах user на receiver

export const Notifications: FC = () => {
    const { dataApplications, dataInvations } = useNotifications();

    return (
        <div className={classes.notificationsList}>
            {dataInvations?.map((invitation: any) => (
                <Invitation
                    key={invitation.invitation.id}
                    invitation_id={invitation.invitation.id}
                    receiver_id={invitation.user._id}
                    status={invitation.status}
                    event_id={invitation.invitation.event._id}
                    image={invitation.invitation.event.image}
                    eventName={invitation.invitation.event?.name}
                    coordinates={invitation.invitation.event.location.coordinates}
                    startDate={invitation.invitation.event.startDate}
                    time={invitation.invitation.event.time}
                    organizerName={invitation.invitation.event.organizer.name}
                    senderName={invitation.invitation.sender.name}
                    organizer_id={invitation.invitation.event.organizer._id}
                    sender_id={invitation.invitation.sender._id}
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
