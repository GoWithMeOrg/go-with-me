'use client';

import { ButtonBack } from '@/components/shared/ButtonBack';
import { Title } from '@/components/shared/Title';
import { EventForm } from '@/components/widgets/EventForm';
import type { NextPage } from 'next';

import classes from './page.module.css';

const EventNewPage: NextPage = () => {
    return (
        <div className={classes.createEventFormWrapper}>
            <ButtonBack />

            <Title className={classes.createEventTitle} title="CREATE EVENT" tag={'h2'} />

            <EventForm />
        </div>
    );
};

export default EventNewPage;
