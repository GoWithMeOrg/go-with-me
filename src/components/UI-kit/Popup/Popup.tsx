import { createPortal } from "react-dom";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Popup.module.css";
interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    showPopup: boolean;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Popup: FC<PopupProps> = ({ showPopup, setShowPopup, containerProps, children, ...rest }) => {
    const [containerState, setContainerState] = useState<HTMLDivElement | null>(null);
    const refPopup = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const body = document.querySelector("body");
        if (!body) return;
        const containerExist = document.getElementById("popupContainer");
        if (showPopup) {
            if (containerExist) return;
            const container = document.createElement("div");
            container.id = "popupContainer";
            body.append(container);
            setContainerState(container);
            container.addEventListener("click", (event: MouseEvent) => {
                if (!refPopup.current?.contains(event.target as Node)) setShowPopup(false);
            });
        }
        if (!showPopup) {
            if (containerExist) {
                containerExist.remove();
            }
        }
    }, [showPopup, setShowPopup]);

    const render = (
        <div className={styles.popupContainer} {...containerProps}>
            <div ref={refPopup} {...rest} style={{ width: "900px" }}>
                {children}
            </div>
        </div>
    );

    if (!showPopup) return null;
    if (!containerState) return null;
    return <>{createPortal(render, containerState)}</>;
};

export default Popup;
