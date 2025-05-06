import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@apollo/client";

import { Button } from "@/components/shared/Button";

import classes from "./Application.module.css";
import { ACCEPT_COMPANION_MUTATION, REJECT_COMPANION_MUTATION } from "@/app/api/graphql/mutations/companionRequest";

interface ApplicationProps {
    id: string;
    senderId?: string;
    name: string;
    image: string;
    status: string;
}

export const Application: FC<ApplicationProps> = ({ id, name, status, image, senderId }) => {
    const [AcceptCompanionRequest] = useMutation(ACCEPT_COMPANION_MUTATION);
    const [RejectCompanionRequest] = useMutation(REJECT_COMPANION_MUTATION);

    const acceptRequest = async () => {
        try {
            await AcceptCompanionRequest({
                variables: { requestId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    const rejectRequest = async () => {
        try {
            await RejectCompanionRequest({
                variables: { requestId: id },
            });
        } catch (error) {
            console.error("Error deleting event: ", error);
        }
    };

    return (
        <div id={id} className={classes.invation}>
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
                    <div className={classes.buttons}>
                        <Button onClick={acceptRequest} className={classes.buttonAccept}>
                            Accept
                        </Button>
                        <Button onClick={rejectRequest} className={classes.buttonRefuse}>
                            Reject
                        </Button>
                    </div>
                </div>
            </div>

            <div className={classes.invationStatus}>
                <div className={classes.plaque}>{status}</div>
            </div>
        </div>
    );
};
