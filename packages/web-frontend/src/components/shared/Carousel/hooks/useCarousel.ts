import { useEffect, useRef, useState } from 'react';

export interface ICarousel {
  children: React.ReactNode[];
  title?: string;
  hideButton?: boolean;
  marginBottom: string;
}
export const useCarousel = ({ children }: ICarousel) => {
  const [width, setWidth] = useState<number | null>(null);
  const [hideSlider, setHideSlider] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [length, setLength] = useState<number>(children?.length);

  const slideRef = useRef<HTMLDivElement>(null);
  const slideWidth = slideRef.current?.offsetWidth || 0;

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
    setLength(children?.length);
  }, [children]);

  useEffect(() => {
    const updateWidth = () => {
      const containerGrid = 1190;
      setWidth(containerGrid);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
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
