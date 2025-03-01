import { useEffect, useRef, useState } from "react";

interface useBackdropProps {
    children: React.ReactNode;
}
export const useBackdrop = ({ children }: useBackdropProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ top: "0px", height: "0px" });
    useEffect(() => {
        const updateBackground = () => {
            if (!containerRef.current) return;
            // Получаем дочерние элементы внутри контейнера
            const rows = Array.from(containerRef.current.children) as HTMLDivElement[];
            if (rows.length === 0) return;

            //получаем первую строку c элементами
            const firstRow = rows[0];
            const size = firstRow.children[0] as HTMLDivElement;
            //получаем ппоследюю строку c элементами (длинна массива -1)
            const lastRow = rows[rows.length - 1];

            const firstRowMiddle = firstRow.offsetTop + firstRow.offsetHeight / 3;
            const lastRowMiddle = lastRow.offsetTop + lastRow.offsetHeight / 3;

            setStyle({
                top: `${firstRowMiddle}px`,
                height: `${lastRowMiddle - firstRowMiddle}px`,
            });
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, [children]);

    return { containerRef, style, setStyle };
};

export default useBackdrop;
