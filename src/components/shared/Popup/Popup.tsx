import { createPortal } from "react-dom";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./Popup.module.css";

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
    showPopup: boolean;
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Popup: FC<PopupProps> = ({ showPopup, setShowPopup, wrapperProps, children, ...rest }) => {
    const refPopup = useRef<HTMLDivElement>(null);
    const [container, setContainer] = useState<HTMLElement | null>(null);

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
        <div className={styles.wrapper} {...wrapperProps}>
            <div ref={refPopup} {...rest}>
                {children}
            </div>
        </div>,
        container,
    );
};
