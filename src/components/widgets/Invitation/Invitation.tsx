import { FC } from "react";

import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";
import { Geocoding } from "@/components/widgets/GoogleMap";

import InvationAccepted from "@/assets/icons/invationAccepted.svg";
import InvationDeclined from "@/assets/icons/invationDeclined.svg";

import { useInvitation } from "./hooks";

import { InvitationProps } from "@/components/widgets/Invitation/types/Invitation";

import classes from "./Invitation.module.css";

export const Invitation: FC<InvitationProps> = ({
    invitation_id,
    status,
    event_id,
    image,
    eventName,
    coordinates,
    startDate,
    time,
    organizerName,
    senderName,
    organizer_id,
    sender_id,
    receiver_id,
}) => {
    const { acceptInvation, declineInvitation } = useInvitation({ invitation_id, receiver_id });
    const invitationCss = [
        classes.invitation,
        (status === "Accepted" || status === "Declined") && classes.invitationActive,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={invitationCss}>
            <div className={classes.image}>
                {image && (
                    <Link href={`/events/${event_id}`}>
                        <Image src={image} alt="img" width={92} height={92} />
                    </Link>
                )}
            </div>

            <div className={classes.info}>
                <Link href={`/events/${event_id}`}>
                    <Title tag={"h3"} className={classes.title}>
                        {eventName}
                    </Title>
                </Link>

                <div className={classes.location}>
                    <Geocoding coordinates={coordinates} /> | {dayjs(startDate).format("DD.MM.YY")} | {time}
                </div>

                <div className={classes.organizer}>
                    event organizer
                    <Link href={`/profile/${organizer_id}/public`} className={classes.organizer}>
                        {" "}
                        {organizerName}
                    </Link>
                </div>
                <div className={classes.organizer}>
                    Invited by
                    <Link href={`/profile/${sender_id}/public`} className={classes.organizer}>
                        {" "}
                        {senderName}
                    </Link>
                </div>

                <div className={classes.buttonsBlock}>
                    {status === "Invited" ? (
                        <div className={classes.buttons}>
                            <Button onClick={acceptInvation}>Accept</Button>
                            <Button onClick={declineInvitation}>Decline</Button>
                            <Button>Mark as read</Button>
                        </div>
                    ) : (
                        status === "Accepted" && (
                            <div className={classes.buttons}>
                                <div className={classes.invationAccepted}>
                                    <InvationAccepted style={{ transform: "scale(1.2)" }} />
                                    <div style={{ marginLeft: "0.5rem" }}>Invation accepted</div>
                                </div>

                                <Button size={"normal"} onClick={declineInvitation}>
                                    Decline instead
                                </Button>
                            </div>
                        )
                    )}

                    {status === "Declined" && (
                        <div className={classes.buttons}>
                            <div className={classes.invationAccepted}>
                                <InvationDeclined style={{ transform: "scale(1)" }} />
                                <div style={{ marginLeft: "0.5rem" }}>Invitation declined</div>
                            </div>

                            <Button size={"normal"} onClick={acceptInvation}>
                                Accept instead
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className={classes.invationStatus}>
                <div className={classes.invationPlaque}>
                    {status === "Accepted" ? (
                        <div className={classes.plaque}>Accepted</div>
                    ) : status === "Declined" ? (
                        <div className={`${classes.plaque} ${classes.plaqueActive}`}>Declined</div>
                    ) : (
                        <div className={`${classes.plaque} ${status === "Declined" && classes.plaqueActive}`}>
                            Invited
                        </div>
                    )}
                    <div className={classes.invationDate}>{dayjs().format("DD.MM.YY")}</div>
                </div>
            </div>
        </div>
    );
};
