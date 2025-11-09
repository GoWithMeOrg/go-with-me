import React, { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shared/Button";

import classes from "./Application.module.css";
import { useApplication } from "./hooks";

export interface ApplicationProps {
    id: string;
    key: string;
    senderId?: string;
    name: string;
    image: string;
    status: string;
}

export const Application: FC<ApplicationProps> = ({ id, name, status, image, senderId }) => {
    const { acceptRequest, rejectRequest } = useApplication({ id });

    console.log(id);
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
