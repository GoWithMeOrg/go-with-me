import { useEffect, useRef, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const MOBILE_SCALE = 0.4;

function useViewportScale(): number {
  const [scale, setScale] = useState(
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
      ? MOBILE_SCALE
      : 1,
  );

  useEffect(() => {
    const update = () => {
      setScale(window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_SCALE : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return scale;
}

interface useBackdropProps {
  children: React.ReactNode;
  marginTop: number;
  marginBottom: number;
}
export const useBackdrop = ({ children, marginTop, marginBottom }: useBackdropProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ top: string; height: string } | undefined>(undefined);
  const scale = useViewportScale();

  useEffect(() => {
    const updateBackground = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;

      const adjustedTop = containerTop + marginTop * scale;
      const adjustedHeight = containerHeight - marginBottom * scale;

      setStyle({
        top: `${adjustedTop}px`,
        height: `${adjustedHeight}px`,
      });
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);
    return () => window.removeEventListener('resize', updateBackground);
  }, [children, marginTop, marginBottom, scale]);

  return { containerRef, style, setStyle };
};

export default useBackdrop;
