import React, { FC } from "react";

import { Button } from "@/components/shared/Button";
import { Title } from "@/components/shared/Title";
import { Control } from "@/components/shared/Slider/Control";
import { Slide } from "@/components/shared/Slider/Slide";

import { useSlider } from "./hook/useSlider";

import { IEvent } from "@/database/models/Event";

import classes from "./Slider.module.css";

export const Slider: FC = () => {
    const { hideSliderHandler, hideSlider, currentIndex, filterEventsImage, slideWidth, nextSlide } = useSlider();

    return (
        <>
            {!hideSlider && (
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Title tag={"h3"} title="Recommended events" />
                        <Button resetDefaultStyles={true} className={classes.hide} onClick={hideSliderHandler}>
                            HIDE
                        </Button>
                    </div>
                    <div>
                        <div
                            className={classes.slides}
                            style={{
                                transform: `translateX(-${currentIndex * slideWidth}vw)`,
                                width: `${filterEventsImage?.length * slideWidth}vw`,
                            }}
                        >
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
                        </div>
                    </div>
                    <Control onNext={nextSlide} />
                </div>
            )}
        </>
    );
};
