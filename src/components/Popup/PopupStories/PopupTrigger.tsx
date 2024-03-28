import { FC, useRef, useState } from "react";
import Popup from "../Popup";

export const PopupTrigger: FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    return (
        <>
            <button onClick={() => setShowPopup(true)}>ShowPopup</button>
            <Popup {...{ setShowPopup, showPopup }}>
                <div style={{ backgroundColor: "white", padding: "1rem" }}>
                    <p>PopupText</p>
                </div>
            </Popup>
        </>
    );
};
