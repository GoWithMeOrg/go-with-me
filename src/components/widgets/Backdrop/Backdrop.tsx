import useBackdrop from "./hooks/useBackdrop";

import classes from "./Backdrop.module.css";

interface BackdropProps {
    children: React.ReactNode;
    marginTop: number;
    marginBottom: number;
}

export const Backdrop: React.FC<BackdropProps> = ({ children, marginTop, marginBottom }) => {
    const { containerRef, style } = useBackdrop({ children, marginTop, marginBottom });

    return (
        <div className={classes.backdrop}>
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    width: "100vw",
                    minHeight: "100vh",
                    backgroundColor: "red",
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
