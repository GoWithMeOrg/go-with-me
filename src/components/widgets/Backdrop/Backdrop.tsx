import useBackdrop from "./hooks/useBackdrop";

import classes from "./Backdrop.module.css";

interface BackdropProps {
    children: React.ReactNode;
}

export const Backdrop: React.FC<BackdropProps> = ({ children }) => {
    const { containerRef, style } = useBackdrop({ children });

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
