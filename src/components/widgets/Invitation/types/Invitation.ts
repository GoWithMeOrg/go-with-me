import { HTMLAttributes } from "react";

export interface InvitationProps extends HTMLAttributes<HTMLDivElement> {
    invitation_id: string;
    receiver_id: string;
    status: string;
    event_id: string;
    image: string;
    eventName: string;
    coordinates: [number, number];
    startDate: string;
    time: string;
    organizerName: string;
    senderName: string;
    organizer_id: string;
    sender_id: string;
}

export interface IUseInvitation {
    invitation_id: string;
    receiver_id: string;
}
