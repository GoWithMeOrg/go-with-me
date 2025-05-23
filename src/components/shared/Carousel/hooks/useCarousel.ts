import { useEffect, useState } from "react";

export interface ICarousel {
    children: React.ReactNode[];
    title?: string;
    hideButton?: boolean;
    marginBottom: string;
}
export const useCarousel = ({ children }: ICarousel) => {
    const [width, setWidth] = useState<number | null>(null);
    const [hideSlider, setHideSlider] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [length, setLength] = useState<number>(children.length);

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
        setLength(children.length);
    }, [children]);

    useEffect(() => {
        const updateWidth = () => {
            const windowInnerWidth = window.innerWidth;
            const containerGrid = 1180;
            setWidth((windowInnerWidth - containerGrid) / 2 + containerGrid);
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return { width, length, hideSlider, currentIndex, next, hideSliderHandler, showSliderHandler };
};
