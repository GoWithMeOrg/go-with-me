import { createPortal } from "react-dom";
import { FC, PropsWithChildren } from "react";

import classes from "./Popup.module.css";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    container: HTMLElement | null;
    refPopup: React.RefObject<HTMLDivElement | null>;
    popupCss: string;
    showPopup: boolean;
}

export const Popup: FC<PropsWithChildren<PopupProps>> = ({ container, refPopup, popupCss, showPopup, children }) => {
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
