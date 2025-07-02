"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import classes from "../Popup.module.css";

interface IUsePopup {
    popupMode?: "auth" | "map";
    // showPopup: boolean;
    // setShowPopup: Dispatch<SetStateAction<boolean>>;
}

export const usePopup = ({ popupMode }: IUsePopup) => {
    const refPopup = useRef<HTMLDivElement>(null);
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = useCallback(() => {
        setShowPopup(true);
    }, []);

    const handleHidePopup = useCallback(() => {
        setShowPopup(false);
    }, []);

    const popupCss = [classes.popup, popupMode === "auth" && classes.auth, popupMode === "map" && classes.map]
        .filter(Boolean)
        .join(" ");

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if (refPopup.current && !refPopup.current.contains(event.target as Node)) {
            setShowPopup(false);
        }
    }, []);

    const managePopupContainer = useCallback(() => {
        let popupContainer = document.getElementById("popupContainer");

        if (!popupContainer) {
            popupContainer = document.createElement("div");
            popupContainer.id = "popupContainer";
            document.body.appendChild(popupContainer);
        }

        setContainer(popupContainer);

        if (showPopup) {
            document.body.style.overflow = "hidden";
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            if (!document.querySelector("#popupContainer")?.hasChildNodes()) {
                popupContainer?.remove();
            }
        };
    }, [showPopup, handleOutsideClick]);

    useEffect(() => {
        const cleanup = managePopupContainer();
        return cleanup;
    }, [showPopup, managePopupContainer]);

    return { refPopup, popupCss, showPopup, setShowPopup, handleShowPopup, handleHidePopup, container, setContainer };
};
