import { FC } from "react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";
import { ButtonNext } from "@/components/shared/ButtonNext";

import { ICarousel, useCarousel } from "./hooks/useCarousel";

import classes from "./Carousel.module.css";

export const Carousel: FC<ICarousel> = ({ children, title, hideButton, marginBottom }) => {
    const { width, hideSlider, currentIndex, next, hideSliderHandler, length, showSliderHandler } = useCarousel({
        children,
        marginBottom,
    });

    return (
        <>
            {!hideSlider && (
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Title tag={"h3"} title={title} />
                        {!hideButton && (
                            <Button resetDefaultStyles={true} className={classes.hide} onClick={hideSliderHandler}>
                                СКРЫТЬ
                            </Button>
                        )}
                    </div>

                    <div className={classes.wrapper} style={{ maxWidth: `${width}px`, marginBottom }}>
                        <div
                            className={classes.content}
                            style={{ transform: `translateX(-${currentIndex * (100 / length)}%)` }}
                        >
                            {children}
                        </div>

                        <ButtonNext onNext={next} />
                    </div>
                </div>
            )}

            {hideSlider && (
                <div className={classes.hideSlider}>
                    <div className={classes.header}>
                        <Button resetDefaultStyles={true} className={classes.hide} onClick={showSliderHandler}>
                            ПОКАЗАТЬ РЕКОМЕНДАЦИИ
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};
