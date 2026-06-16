import { FC } from 'react';
import { CompanionRequest } from '@/components/shared/CompanionRequest';
import { Invitation } from '@/components/widgets/Invitation';

import { useNotifications } from './hooks';

import classes from './Notifications.module.css';

export const Notifications: FC = () => {
    const { requests, invations } = useNotifications();

    interface IInvitation {
        _id: string;
        invitation: {
            _id: string;
            event: {
                _id: string;
                image: string;
                name: string;
                location: {
                    geometry: {
                        coordinates: [number, number];
                    };
                };
                startDate: string;
                time: string;
                organizer: {
                    _id: string;
                    firstName: string;
                };
            };
            sender: {
                _id: string;
                firstName: string;
            };
        };
        status: string;
        user: {
            _id: string;
        };
    }

    return (
        <div className={classes.notificationsList}>
            {invations?.map((invitation: IInvitation) => (
                <Invitation
                    key={invitation._id}
                    invitation_id={invitation.invitation._id}
                    receiver_id={invitation.user._id}
                    status={invitation.status}
                    event_id={invitation.invitation.event._id}
                    image={invitation.invitation.event.image}
                    eventName={invitation.invitation.event?.name}
                    coordinates={invitation.invitation.event.location.geometry.coordinates}
                    startDate={invitation.invitation.event.startDate}
                    time={invitation.invitation.event.time}
                    organizerName={invitation.invitation.event.organizer.firstName}
                    senderName={invitation.invitation.sender.firstName}
                    organizer_id={invitation.invitation.event.organizer._id}
                    sender_id={invitation.invitation.sender._id}
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
