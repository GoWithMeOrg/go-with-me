import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import Geocoding from "@/components/widgets/GoogleMap/Geocoding";
import { IUser } from "@/database/types/User";
import { Button } from "@/components/shared/Button";
import Joined from "@/assets/icons/joined.svg";

import classes from "./Invation.module.css";

export enum Condition {
    CANCELED = "canceled",
    ENDED = "ended",
}

export enum InvationStatus {
    ACCEPTED = "accepted",
    DECLINED = "declined",
}

interface InvationProps {
    id: string;
    organizer: IUser;
    name: string;
    description: string;
    coord: [number, number];
    startDate: string | Date | undefined;
    time: string | undefined;
    image?: string;
    condition?: Condition;
}

// Accepted - принял, Refesuded - отказался
// Canceled - отменено, Ended - закончилось

// Как мы будем отменять событие. В событие предусмотреть процедуру отмены. В описание интерфесай события добавить варианты (отменено, закончено, активно)
//
export const Invation = ({ id, organizer, name, coord, startDate, time, image, condition }: InvationProps) => {
    const [invationStatus, setInvationStatus] = useState<string>("");
    //const [eventStatus, setEventStatus] = useState<string>("");

    const handleClickAccept = () => {
        setInvationStatus(InvationStatus.ACCEPTED);
    };

    const handleClickCanceled = () => {
        setInvationStatus("");
    };

    const handleClickRefuse = () => {
        setInvationStatus(InvationStatus.DECLINED);
    };

    console.log(invationStatus);

    return (
        <div
            id={id}
            className={`
                ${classes.invation} 
                ${invationStatus === InvationStatus.ACCEPTED && classes.invationActive} 
                ${invationStatus === InvationStatus.DECLINED && classes.invationActive}`}
        >
            <div className={classes.image}>
                {image && (
                    <Link href={`/events/${id}`}>
                        <Image src={image} alt="img" width={92} height={92} />
                    </Link>
                )}
            </div>

            <div className={classes.info}>
                <Link href={`/events/${id}`}>
                    <span className={classes.title}>{name}</span>
                </Link>

                <div className={classes.location}>
                    <Geocoding coordinates={coord} /> | {dayjs(startDate).format("DD.MM.YY")} | {time}
                </div>

                <div className={classes.organizer}>event organizer {organizer?.name}</div>
                <div className={classes.organizer}>Invited by Violetta Capybara </div>

                <div className={classes.buttonsBlock}>
                    {invationStatus !== InvationStatus.ACCEPTED && invationStatus !== InvationStatus.DECLINED ? (
                        <div className={classes.buttons}>
                            <Button onClick={handleClickAccept} className={classes.buttonAccept}>
                                Accept
                            </Button>
                            <Link href={`/events/${id}`}>
                                <Button className={classes.buttonSee}>See more details</Button>
                            </Link>
                            <Button onClick={handleClickRefuse} className={classes.buttonRefuse}>
                                Decline
                            </Button>
                        </div>
                    ) : (
                        invationStatus !== InvationStatus.DECLINED && (
                            <div className={classes.buttons}>
                                <div className={classes.invationAccepted}>
                                    <Joined style={{ transform: "scale(1.2)" }} />
                                    <div style={{ marginLeft: "0.5rem" }}>Invation accepted</div>
                                </div>

                                <Button onClick={handleClickCanceled} className={classes.buttonCancel}>
                                    Cancel conset
                                </Button>
                            </div>
                        )
                    )}

                    {invationStatus === InvationStatus.DECLINED && (
                        <div className={classes.buttons}>
                            <Button onClick={handleClickAccept} className={classes.buttonAccept}>
                                Accept
                            </Button>
                            <Button className={classes.buttonSee}>See more details</Button>
                        </div>
                    )}
                </div>
            </div>

            <div className={classes.invationStatus}>
                <div className={classes.invationPlaque}>
                    {invationStatus === InvationStatus.ACCEPTED ? (
                        <div className={classes.plaque}>Accepted</div>
                    ) : invationStatus === InvationStatus.DECLINED ? (
                        <div className={`${classes.plaque} ${classes.plaqueActive}`}>Declined</div>
                    ) : (
                        <div
                            className={`${classes.plaque} ${invationStatus === InvationStatus.DECLINED && classes.plaqueActive}`}
                        >
                            Invited
                        </div>
                    )}
                    <div className={classes.invationDate}>{dayjs().format("DD.MM.YY")}</div>
                </div>
            </div>
        </div>
    );
};

export default Invation;
