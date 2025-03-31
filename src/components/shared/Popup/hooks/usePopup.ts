"use client";

import { useEffect, useRef, useState } from "react";
import classes from "../Popup.module.css";

interface IUsePopup {
    popupMode?: string;
}
export const usePopup = ({ popupMode }: IUsePopup) => {
    const refPopup = useRef<HTMLDivElement>(null);
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleHidePopup = () => {
        setShowPopup(false);
    };

    const popupCss = [classes.popup, popupMode === "auth" && classes.auth, popupMode === "map" && classes.map]
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
    }, []);

    return { refPopup, popupCss, showPopup, setShowPopup, handleShowPopup, handleHidePopup, container, setContainer };
};
