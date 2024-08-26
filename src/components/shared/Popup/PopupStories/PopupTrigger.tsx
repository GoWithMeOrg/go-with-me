import { FC, useState } from "react";

import { Button } from "../../Button";
import { Popup } from "../Popup";

export const PopupTrigger: FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <>
            <Button
                onClick={(event) => {
                    event.stopPropagation();
                    setShowPopup(true);
                }}
            >
                ShowPopup
            </Button>
            <Popup {...{ setShowPopup, showPopup }}>
                <div style={{ backgroundColor: "white", padding: "1rem" }}>
                    <p>PopupText</p>
                </div>
            </Popup>
        </>
    );
};
