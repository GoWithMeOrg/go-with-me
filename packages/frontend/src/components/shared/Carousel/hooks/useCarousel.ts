import { useEffect, useRef, useState } from 'react';

export interface ICarousel {
    children: React.ReactNode[];
    title?: string;
    hideButton?: boolean;
    marginBottom: string;
}
export const useCarousel = ({ children }: ICarousel) => {
    const [hideSlider, setHideSlider] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [slideWidth, setSlideWidth] = useState<number>(0);

    const slideRef = useRef<HTMLDivElement>(null);

    const length = children?.length ?? 0;
    const width = 1190;

    const hideSliderHandler = () => {
        setHideSlider(true);
    };

    const showSliderHandler = () => {
        setHideSlider(false);
    };

    const next = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    };

    useEffect(() => {
        const updateSlideWidth = () => {
            setSlideWidth(slideRef.current?.offsetWidth ?? 0);
        };

        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);

        return () => window.removeEventListener('resize', updateSlideWidth);
    }, []);

    return {
        width,
        length,
        hideSlider,
        currentIndex,
        next,
        hideSliderHandler,
        showSliderHandler,
        slideRef,
        slideWidth,
    };
};
