import { createPortal } from "react-dom";
import { Dispatch, FC, SetStateAction } from "react";
import { usePopup } from "./hooks";

import classes from "./Popup.module.css";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    showPopup: boolean;
    setShowPopup?: Dispatch<SetStateAction<boolean>>;
    popupMode?: "map" | "auth";
    container?: HTMLElement | null;
    refPopup?: React.RefObject<HTMLDivElement | null>;
    popupCss?: string;
}

export const Popup: FC<PopupProps> = ({
    showPopup,
    setShowPopup,
    popupMode,
    container: externalContainer,
    refPopup: externalRef,
    popupCss: externalCss,
    children,
}) => {
    // fallback к usePopup, если какие-то пропсы не переданы берем данные из хука!
    // Данные из хука usePopup должны приходить либо из компнента, либо отсюда! Иначе будут разные состояния
    // Для того что бы был управляемый Popup из вышестоящего компонента, необходимо передавать пропсы сверху.
    const fallback = usePopup({ popupMode });

    const container = externalContainer ?? fallback.container;
    const refPopup = externalRef ?? fallback.refPopup;
    const popupCss = externalCss ?? fallback.popupCss;

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
