import React, { FC } from 'react';
import { Button } from '@/components/shared/Button';
import { ButtonNext } from '@/components/shared/ButtonNext';
import { Title } from '@/components/shared/Title';

import { ICarousel, useCarousel } from './hooks/useCarousel';

import classes from './Carousel.module.css';

export const Carousel: FC<ICarousel> = ({ children, title, hideButton, marginBottom }) => {
  const {
    width,
    hideSlider,
    currentIndex,
    next,
    hideSliderHandler,
    length,
    showSliderHandler,
    slideRef,
    slideWidth,
  } = useCarousel({
    children,
    marginBottom,
  });

  return (
    <>
      {!hideSlider && (
        <div className={classes.container}>
          <div className={classes.header}>
            <Title tag={'h3'} title={title} />
            {!hideButton && (
              <Button
                resetDefaultStyles={true}
                className={classes.hide}
                onClick={hideSliderHandler}
              >
                СКРЫТЬ
              </Button>
            )}
          </div>

          <div className={classes.wrapper} style={{ maxWidth: `${width}px`, marginBottom }}>
            <div
              className={classes.content}
              style={{ transform: `translateX(-${currentIndex * (slideWidth + 20)}px)` }}
            >
              {React.Children.map(children, (child) =>
                React.cloneElement(child as any, { slideRef })
              )}
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
