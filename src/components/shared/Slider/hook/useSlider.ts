import { useEffect, useState } from "react";

import { useEventListHome } from "@/components/widgets/EvenListHome/hook/useEventListHome";

export const useSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hideSlider, setHideSlider] = useState(false);

    const { data } = useEventListHome();

    const hideSliderHandler = () => {
        setHideSlider(true);
    };

    const filterEventsImage = data?.events.filter((event: any) => event.image !== null && event.image !== "");

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
