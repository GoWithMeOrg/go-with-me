import React, { FC } from 'react';
import { Button } from '@/components/shared/Button';
import Image from 'next/image';
import Link from 'next/link';

import { useCompanionRequest } from './hooks';
import { CompanionRequestProps } from './interfaces/CompanionRequestProps';

import classes from './CompanionRequest.module.css';

export const CompanionRequest: FC<CompanionRequestProps> = ({
    request_id,
    name,
    status,
    image,
    sender_id,
}) => {
    const { acceptRequest, rejectRequest } = useCompanionRequest({ request_id });

    return (
        <div id={request_id} className={classes.invation}>
            <div className={classes.image}>
                {image && (
                    <Link href={`/profile/${sender_id}/public`}>
                        <Image src={image} alt="img" width={92} height={92} />
                    </Link>
                )}
            </div>

            <div className={classes.info}>
                <Link href={`/profile/${sender_id}/public`}>
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
