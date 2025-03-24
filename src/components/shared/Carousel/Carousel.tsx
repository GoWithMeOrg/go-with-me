import { FC } from "react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";
import { ButtonNext } from "@/components/shared/ButtonNext";

import { ICarousel, useCarousel } from "./hooks/useCarousel";

import classes from "./Carousel.module.css";

export const Carousel: FC<ICarousel> = ({ children }) => {
    const { width, hideSlider, currentIndex, next, hideSliderHandler, length } = useCarousel({ children });

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
