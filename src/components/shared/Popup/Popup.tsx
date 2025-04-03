import { createPortal } from "react-dom";
import { Dispatch, FC, SetStateAction } from "react";
import { usePopup } from "./hooks";

import classes from "./Popup.module.css";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    showPopup: boolean;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    popupMode: "map" | "auth";
}

export const Popup: FC<PopupProps> = ({ showPopup, children, popupMode }) => {
    const { refPopup, container, popupCss } = usePopup({ popupMode });

    if (!showPopup || !container) return null;

    return createPortal(
        <div className={classes.wrapper}>
            <div ref={refPopup} className={popupCss}>
                {children}
            </div>
        </div>,
        container,
    );
};
