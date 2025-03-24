"use client";

import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { EventFilters } from "@/components/widgets/EventFilters";
import { CreateAndInvite } from "@/components/widgets/CreateAndInvite";
import { Mode } from "@/components/widgets/CreateAndInvite/CreateAndInvite";

import { Title } from "@/components/shared/Title";
import { Slider } from "@/components/shared/Slider";
import { Carousel } from "@/components/shared/Carousel";

import classes from "./page.module.css";
import { useSlider } from "@/components/shared/Slider/hook/useSlider";
import { IEvent } from "@/database/models/Event";
import { Slide } from "@/components/shared/Slider/Slide";

const EventListPage: NextPage = () => {
    const { status } = useSession();
    const { hideSliderHandler, hideSlider, currentIndex, filterEventsImage, slideWidth, nextSlide } = useSlider();

    const arr = filterEventsImage.length;

    return (
        <div className={classes.eventListPage}>
            <Title tag={"h1"} title="Присоединяйтесь к приключениям" className={classes.title} />
            {/* <Slider /> */}
            {/* <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto", marginTop: 64 }}> */}
            <Carousel show={3} arr={arr}>
                {filterEventsImage.map((slide: IEvent) => (
                    <Slide
                        key={slide._id}
                        id={slide._id}
                        name={slide.name}
                        image={slide.image as string}
                        startDate={slide.startDate as Date}
                        time={slide.time as string}
                        coord={[slide.location.coordinates[0], slide.location.coordinates[1]]}
                    />
                ))}
            </Carousel>
            {/* </div> */}

            <EventFilters />
            <CreateAndInvite mode={Mode.EVENT} status={status} />
        </div>
    );
};

export default EventListPage;
