import React, { FC } from 'react';
import { Application } from '@/components/shared/Application';
import { Invitation } from '@/components/widgets/Invitation';

import { useNotifications } from './hooks';

import classes from './Notifications.module.css';

export const Notifications: FC = () => {
  const { dataApplications, dataInvations } = useNotifications();

  interface IInvitation {
    id: string;
    createdAt: Date;
    invitation: {
      id: string;
      event: {
        _id: string;
        image: string;
        name: string;
        location: {
          coordinates: [number, number];
        };
        startDate: string;
        time: string;
        organizer: {
          _id: string;
          name: string;
        };
      };
      sender: {
        _id: string;
        name: string;
      };
    };
    status: string;
    user: {
      _id: string;
    };
  }

  return (
    <div className={classes.notificationsList}>
      {dataInvations?.map((invitation: IInvitation) => (
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
