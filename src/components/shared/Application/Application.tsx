import React, { FC, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import { Button } from "@/components/shared/Button";
import Joined from "@/assets/icons/joined.svg";

import classes from "./Application.module.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const ACCEPT_COMPANION_MUTATION = gql`
    mutation AcceptFriendRequest($requestId: String!) {
        acceptFriendRequest(requestId: $requestId) {
            status
        }
    }
`;

const REJECT_COMPANION_MUTATION = gql`
    mutation RejectFriendRequest($requestId: String!) {
        rejectFriendRequest(requestId: $requestId) {
            status
        }
    }
`;

export enum Status {
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

interface ApplicationProps {
    id: string;
    senderId?: string;
    name: string;
    image: string;
    status: string;
}

export const Application: FC<ApplicationProps> = ({ id, name, status, image, senderId }) => {
    const [invationStatus, setInvationStatus] = useState<string>("");

    const [AcceptFriendRequest] = useMutation(ACCEPT_COMPANION_MUTATION);
    const [RejectFriendRequest] = useMutation(REJECT_COMPANION_MUTATION);

    const acceptRequest = async () => {
        try {
            await AcceptFriendRequest({
                variables: { requestId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const rejectRequest = async () => {
        try {
            await RejectFriendRequest({
                variables: { requestId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const handleClickAccept = () => {
        setInvationStatus(Status.ACCEPTED);
    };

    const handleClickCanceled = () => {
        setInvationStatus("");
    };

    const handleClickRejected = () => {
        setInvationStatus(Status.REJECTED);
    };

    return (
        <div
            id={id}
            className={`
                ${classes.invation} 
                ${invationStatus === Status.ACCEPTED && classes.invationActive} 
                ${invationStatus === Status.REJECTED && classes.invationActive}`}
        >
            <div className={classes.image}>
                {image && (
                    <Link href={`/profile/${senderId}/public`}>
                        <Image src={image} alt="img" width={92} height={92} />
                    </Link>
                )}
            </div>

            <div className={classes.info}>
                <Link href={`/profile/${senderId}/public`}>
                    <span className={classes.title}>{name}</span>
                </Link>

                <div className={classes.organizer}>предлагает Вам стать компаньонами</div>

                <div className={classes.buttonsBlock}>
                    {invationStatus !== Status.ACCEPTED && invationStatus !== Status.REJECTED ? (
                        <div className={classes.buttons}>
                            <Button onClick={acceptRequest} className={classes.buttonAccept}>
                                Accept
                            </Button>
                            <Button onClick={rejectRequest} className={classes.buttonRefuse}>
                                Reject
                            </Button>
                        </div>
                    ) : (
                        invationStatus !== Status.REJECTED && (
                            <div className={classes.invationAccepted}>
                                <Joined style={{ transform: "scale(1.2)" }} />
                                <div style={{ marginLeft: "0.5rem" }}>Application accepted</div>
                            </div>
                        )
                    )}

                    {invationStatus === Status.REJECTED && (
                        <div className={classes.buttons}>
                            <Button onClick={handleClickAccept} className={classes.buttonAccept}>
                                Accept
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className={classes.invationStatus}>
                <div className={classes.invationPlaque}>
                    {invationStatus === Status.ACCEPTED ? (
                        <div className={classes.plaque}>Accepted</div>
                    ) : invationStatus === Status.REJECTED ? (
                        <div className={`${classes.plaque} ${classes.plaqueActive}`}>Rejected</div>
                    ) : (
                        <div
                            className={`${classes.plaque} ${invationStatus === Status.REJECTED && classes.plaqueActive}`}
                        >
                            {status}
                        </div>
                    )}
                    <div className={classes.invationDate}>{dayjs().format("DD.MM.YY")}</div>
                </div>
            </div>
        </div>
    );
};
