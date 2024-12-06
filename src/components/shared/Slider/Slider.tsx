import React, { FC } from "react";

import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";
import { Control } from "@/components/shared/Slider/Control";
import { Slide } from "@/components/shared/Slider/Slide";

import { useSlider } from "./hook/useSlider";

import classes from "./Slider.module.css";

export const Slider: FC = () => {
    const { hideSliderHandler, hideSlider, currentIndex, filterEventsImage, slideWidth, nextSlide } = useSlider();

    return (
        <>
            {!hideSlider && (
                <div>
                    <div className={classes.header}>
                        <Title tag={"h3"} title="Recommended events" />
                        <Button resetDefaultStyles={true} className={classes.hide} onClick={hideSliderHandler}>
                            HIDE
                        </Button>
                    </div>
                    <div className={classes.container}>
                        <div
                            className={classes.slides}
                            style={{
                                transform: `translateX(-${currentIndex * slideWidth}vw)`,
                                width: `${filterEventsImage?.length * slideWidth}vw`,
                            }}
                        >
                            {filterEventsImage?.map((slide: any, index: number) => (
                                <div key={index} className={classes.slide}>
                                    <Slide {...slide} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Control onNext={nextSlide} />
                </div>
            )}
        </>
    );
};
