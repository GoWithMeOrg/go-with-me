import React, { FC } from 'react';
import dayjs from 'dayjs';

import Checkbox from '@/assets/icons/checkbox.svg';
import Plus from '@/assets/icons/plus.svg';
import type { InvitationEvent } from '@/components/widgets/DialogModal/types/DialogModal';

import classes from './InvationEvent.module.css';

export interface InvationEventProps {
    data: InvitationEvent[];
    selectedEvent: InvitationEvent | null;
    handleSelectEvent: (event: InvitationEvent) => void;
}

function truncateName(name: string, maxWords = 3) {
    const words = name.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : name;
}

export const InvationEvent: FC<InvationEventProps> = ({
    data,
    selectedEvent,
    handleSelectEvent,
}) => {
    return (
        <>
            {data?.map((event) => (
                <li key={event._id}>
                    <button
                        className={classes.itemContent}
                        onClick={() => handleSelectEvent(event)}
                    >
                        {selectedEvent === event ? <Checkbox /> : <Plus className={classes.plus} />}

                        <span className={classes.date}>
                            {dayjs(event.startDate).format('DD.MM.YYYY')}
                        </span>
                        {' | '}
                        <span className={classes.eventName}>{truncateName(event.name)}</span>
                    </button>
                </li>
            ))}
        </>
    );
};

export default InvationEvent;
