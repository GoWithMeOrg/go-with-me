import { createPortal } from "react-dom";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import styles from "./Popup.module.css";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    showPopup: boolean;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const Popup: FC<PopupProps> = ({ showPopup, setShowPopup, children, ...rest }) => {
    const [containerState, setContainerState] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const body = document.querySelector("body");
        if (!body) return;
        const containerExist = document.getElementById("popupContainer");
        if (showPopup) {
            if (containerExist) return;
            const container = document.createElement("div");
            container.className = styles.popupContainer;
            container.id = "popupContainer";
            body.append(container);
            setContainerState(container);
        }
        if (!showPopup) {
            if (containerExist) containerExist.remove();
        }
    }, [showPopup]);

    const render = <div {...{ ...rest }}>{children}</div>;
    if (!showPopup) return null;
    if (!containerState) return null;

    return <>{createPortal(render, containerState)}</>;
};

export default Popup;
