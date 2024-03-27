import { createPortal } from "react-dom";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

import styles from "./Popup.module.css";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    showPopup: boolean;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    containerElement?: HTMLElement;
}

const Popup: FC<PopupProps> = ({ showPopup, setShowPopup, wrapperProps, containerElement, children, ...rest }) => {
    const [containerState, setContainerState] = useState<HTMLDivElement | null>(null);
    const refPopup = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const containerExist = document.getElementById("popupContainer");
        if (showPopup) {
            if (containerExist) return;
            const container = document.createElement("div");
            container.id = "popupContainer";
            if (!containerElement) document.querySelector("body")?.append(container);
            if (containerElement) containerElement.append(container);
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
    }, [showPopup, setShowPopup, containerElement]);

    const render = (
        <div className={styles.wrapper} {...wrapperProps}>
            <div ref={refPopup} {...rest}>
                {children}
            </div>
        </div>
    );
    if (!showPopup) return null;
    if (!containerState) return null;

    return <>{createPortal(render, containerState)}</>;
};

export default Popup;
