import React, { useEffect, useRef, useState } from "react";
import classes from "./Backdrop.module.css";

interface BackdropProps {
    children: React.ReactNode;
}

export const Backdrop: React.FC<BackdropProps> = ({ children }) => {
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

    return (
        <div className={classes.backdrop}>
            <div
                style={{
                    position: "absolute",
                    left: "-22%",
                    width: "99.3vw",
                    backgroundColor: "white",
                    zIndex: 1,
                    transition: "all 0.3s ease",
                    ...style,
                }}
            />
            <div ref={containerRef} className={classes.containerRef}>
                {children}
            </div>
        </div>
    );
};

export default Backdrop;
