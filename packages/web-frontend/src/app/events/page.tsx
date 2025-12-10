'use client';

import type { IEvent } from '@/app/types/Event';
import Spinner from '@/assets/icons/spinner.svg';
import { Carousel } from '@/components/shared/Carousel';
import { Slide } from '@/components/shared/Slide';
import { Title } from '@/components/shared/Title';
import { CardEvent } from '@/components/widgets/CardEvent';
import { SizeCard } from '@/components/widgets/CardEvent/CardEvent';
import { CreateAndInvite } from '@/components/widgets/CreateAndInvite';
import { Mode } from '@/components/widgets/CreateAndInvite/CreateAndInvite';
import { EventFilters } from '@/components/widgets/EventFilters';
import { useEventList } from '@/components/widgets/EventList/hooks';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';
import type { NextPage } from 'next';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

import classes from './page.module.css';

const GET_SESSION = gql`
    query Session {
        session {
            _id
            firstName
            lastName
            email
            roles
        }
    }
`;

const EventListPage: NextPage = () => {
    // const { data, loading: session, error } = useQuery(GET_SESSION);
    // console.log(data);
    // const { status } = useSession();
    // const { filterEventsImage, loading } = useEventList({});
    const { data, loading, error } = useQuery(GET_SESSION);

    // Лог для проверки результата запроса
    // console.log('Session Data:', data);

    // Если есть ошибка или сессия не найдена, обработайте это правильно
    if (error) {
        console.error('GraphQL Error:', error);
        return <div>Ошибка загрузки сессии.</div>;
    }

    // const { status } = useSession();
    const { filterEventsImage, loading: eventLoading } = useEventList({});

    if (eventLoading || loading) return <Spinner className={classes.spinner} />;

    //@ts-ignore
    const session = data?.session;
    if (!session) {
        console.warn('Сессия не найдена');
        return <div>Нет доступной сессии.</div>;
    }

    if (loading) return <Spinner className={classes.spinner} />;

    return (
        <div className={classes.eventListPage}>
            <Title tag={'h1'} title="Найди свое племя" className={classes.title} />
            <Carousel title={'Рекомендуемые события'} hideButton={false} marginBottom="7.5rem">
                {filterEventsImage.map((slide: IEvent) => (
                    <Slide
                        key={slide._id}
                        id={slide._id}
                        userId={slide.organizer._id as string}
                        name={slide.name}
                        image={slide.image as string}
                        startDate={slide.startDate as Date}
                        time={slide.time as string}
                        coord={[slide.location.coordinates[0], slide.location.coordinates[1]]}
                        avatar={slide.organizer.image}
                        showAvatar={false}
                    />
                ))}
            </Carousel>

            <EventFilters />

            <Carousel title={'События твоих друзей'} hideButton marginBottom="4.25rem">
                {filterEventsImage.map((slide: IEvent) => (
                    <Slide
                        key={slide._id}
                        id={slide._id}
                        userId={slide.organizer._id as string}
                        name={slide.name}
                        image={slide.image as string}
                        startDate={slide.startDate as Date}
                        time={slide.time as string}
                        coord={[slide.location.coordinates[0], slide.location.coordinates[1]]}
                        avatar={slide.organizer.image}
                        showAvatar
                    />
                ))}
            </Carousel>

            <Carousel title={'События поблизости'} hideButton marginBottom="6.25rem">
                {filterEventsImage.map((slide: IEvent) => (
                    <CardEvent
                        key={slide._id}
                        id={slide._id}
                        name={slide.name}
                        description={slide.description}
                        coord={[slide.location.coordinates[0], slide.location.coordinates[1]]}
                        startDate={slide.startDate}
                        time={slide.time}
                        image={slide.image}
                        size={SizeCard.ML}
                    />
                ))}
            </Carousel>

            <CreateAndInvite mode={Mode.EVENT} status={status} />
        </div>
    );
};

export default EventListPage;
