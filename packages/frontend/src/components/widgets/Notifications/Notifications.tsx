import { FC } from 'react';
import { GetInvitationQuery } from '@/app/graphql/operations';
import { CompanionRequest } from '@/components/shared/CompanionRequest';
import { Invitation } from '@/components/widgets/Invitation';

import { useNotifications } from './hooks';

import classes from './Notifications.module.css';

type InvitationItem = GetInvitationQuery['getInvitation'][number];

export const Notifications: FC = () => {
    const { requests, invations } = useNotifications();

    return (
        <div className={classes.notificationsList}>
            {invations?.map((invitation: InvitationItem) => (
                <Invitation
                    key={invitation._id}
                    invitation_id={invitation._id}
                    receiver_id={invitation.receiver._id}
                    status={invitation.status}
                    event_id={invitation.event._id}
                    image={invitation.event.image as string}
                    eventName={invitation.event.name}
                    coordinates={
                        (invitation.event.location?.geometry.coordinates as
                            | [number, number]
                            | undefined) ?? [0, 0]
                    }
                    startDate={invitation.event.startDate}
                    time={invitation.event.time as string}
                    organizerName={invitation.event.organizer.firstName}
                    senderName={invitation.sender.firstName}
                    organizer_id={invitation.event.organizer._id}
                    sender_id={invitation.sender._id}
                />
            ))}

            {requests?.map((request) => (
                <CompanionRequest
                    key={request._id}
                    request_id={request._id}
                    name={`${request.sender.firstName + ' ' + request.sender.lastName}`}
                    sender_id={request.sender._id}
                    image={request.sender.image as string}
                    status={request.status}
                />
            ))}
            {/* <SystemNotification /> */}
        </div>
    );
};
