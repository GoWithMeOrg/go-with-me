"use client";

import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { EventFilters } from "@/components/widgets/EventFilters";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import { Mode } from "@/components/widgets/CreateAndInvite/CreateAndInvite";
import { useEventList } from "@/components/widgets/EventList/hooks";

import { Title } from "@/components/shared/Title";
import { Carousel } from "@/components/shared/Carousel";
import { Slide } from "@/components/shared/Slide";

import { IEvent } from "@/database/models/Event";

import classes from "./page.module.css";
import { CardEvent } from "@/components/widgets/CardEvent";
import { SizeCard } from "@/components/widgets/CardEvent/CardEvent";

const EventListPage: NextPage = () => {
    const { status } = useSession();
    const { filterEventsImage } = useEventList({});

    return (
        <div className={classes.eventListPage}>
            <Title tag={"h1"} title="Присоединяйтесь к приключениям" className={classes.title} />
            <Carousel title={"Рекомендуемые события"} hideButton={false}>
                {filterEventsImage.map((slide: IEvent) => (
                    <Slide
                        key={slide._id}
                        id={slide._id}
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

            <Carousel title={"События твоих друзей"} hideButton>
                {filterEventsImage.map((slide: IEvent) => (
                    <Slide
                        key={slide._id}
                        id={slide._id}
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

            <Carousel title={"События поблизости"} hideButton>
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
