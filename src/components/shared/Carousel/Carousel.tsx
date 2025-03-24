import { FC, useEffect, useState } from "react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";
import { ButtonNext } from "@/components/shared/ButtonNext";

import classes from "./Carousel.module.css";

interface ICarousel {
    children: React.ReactNode[];
}

export const Carousel: FC<ICarousel> = ({ children }) => {
    const [width, setWidth] = useState<number | null>(null);
    const [hideSlider, setHideSlider] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [length, setLength] = useState<number>(children.length);

    const hideSliderHandler = () => {
        setHideSlider(true);
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

    return (
        <>
            {!hideSlider && (
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Title tag={"h3"} title="Рекомендуемые события" />
                        <Button resetDefaultStyles={true} className={classes.hide} onClick={hideSliderHandler}>
                            СКРЫТЬ
                        </Button>
                    </div>

                    <div className={classes.wrapper} style={{ maxWidth: `${width}px` }}>
                        <div className={classes.contentWrapper}>
                            <div
                                className={classes.content}
                                style={{ transform: `translateX(-${currentIndex * (100 / length)}%)` }}
                            >
                                {children}
                            </div>
                        </div>
                    </div>

                    <ButtonNext onNext={next} />
                </div>
            )}
        </>
    );
};
