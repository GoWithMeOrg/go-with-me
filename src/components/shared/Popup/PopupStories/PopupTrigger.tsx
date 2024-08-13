import { FC, useState } from "react";
import Popup from "../Popup";

export const PopupTrigger: FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <>
            <button
                onClick={(event) => {
                    event.stopPropagation();
                    setShowPopup(true);
                }}
            >
                ShowPopup
            </button>
            <Popup {...{ setShowPopup, showPopup }}>
                <div style={{ backgroundColor: "white", padding: "1rem" }}>
                    <p>PopupText</p>
                </div>
            </Popup>
        </>
    );
};
