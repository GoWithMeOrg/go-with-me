import { useEffect, useRef, useState } from "react";

interface useBackdropProps {
    children: React.ReactNode;
    marginTop: number;
    marginBottom: number;
}
export const useBackdrop = ({ children, marginTop, marginBottom }: useBackdropProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ top: "0px", height: "0px" });

    useEffect(() => {
        const updateBackground = () => {
            if (!containerRef.current) return;

            const containerTop = containerRef.current.offsetTop;
            const containerHeight = containerRef.current.offsetHeight;

            const adjustedTop = containerTop + marginTop;
            const adjustedHeight = containerHeight - marginBottom;

            setStyle({
                top: `${adjustedTop}px`,
                height: `${adjustedHeight}px`,
            });
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, [children, marginTop, marginBottom]);

    return { containerRef, style, setStyle };
};

export default useBackdrop;
