import { useEffect, useState } from "react";

import { useEventList } from "@/components/widgets/EventList/hooks";
import { IEvent } from "@/database/models/Event";

export const useSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hideSlider, setHideSlider] = useState(false);

    const { events } = useEventList({});

    const hideSliderHandler = () => {
        setHideSlider(true);
    };

    const filterEventsImage: IEvent[] = events
        ? events.filter((event: IEvent) => event.image !== undefined && event.image !== "")
        : [];

    const slideWidth = 31.25;
    const maxSlideWidth = 156.26;

    useEffect(() => {
        const totalWidth = currentIndex * slideWidth;

        if (totalWidth >= maxSlideWidth) {
            setCurrentIndex(0);
        }
    }, [currentIndex]);

    const nextSlide = () => {
        if (currentIndex * slideWidth >= maxSlideWidth) return;

        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    return {
        hideSliderHandler,
        hideSlider,
        setHideSlider,
        currentIndex,
        setCurrentIndex,
        filterEventsImage,
        maxSlideWidth,
        slideWidth,
        nextSlide,
    };
};
