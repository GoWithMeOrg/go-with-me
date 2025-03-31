import { createPortal } from "react-dom";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import classes from "./Popup.module.css";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    showPopup: boolean;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    popup: "map" | "auth";
}

export const Popup: FC<PopupProps> = ({ showPopup, setShowPopup, wrapperProps, children, popup }) => {
    const refPopup = useRef<HTMLDivElement>(null);
    const [container, setContainer] = useState<HTMLElement | null>(null);

    const popupCss = [classes.popup, popup === "auth" && classes.auth, popup === "map" && classes.map]
        .filter(Boolean)
        .join(" ");

    useEffect(() => {
        let popupContainer = document.getElementById("popupContainer");

        if (!popupContainer) {
            popupContainer = document.createElement("div");
            popupContainer.id = "popupContainer";
            document.body.appendChild(popupContainer);
        }

        setContainer(popupContainer);

        const eventListener = (event: MouseEvent) => {
            if (!refPopup.current?.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.body.style.overflow = "hidden";
            document.addEventListener("mousedown", eventListener);
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("mousedown", eventListener);
            if (!document.querySelector("#popupContainer")?.hasChildNodes()) {
                popupContainer?.remove();
            }
        };
    }, [showPopup, setShowPopup]);

    if (!showPopup || !container) return null;

    return createPortal(
        <div className={classes.wrapper} {...wrapperProps}>
            <div ref={refPopup} className={popupCss}>
                {children}
            </div>
        </div>,
        container,
    );
};
