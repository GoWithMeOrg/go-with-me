import { FC, useState } from "react";

import { Popup } from "@/components/shared/Popup";
import { Button } from "@/components/shared/Button";

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
            <Popup popupMode={"map"} {...{ setShowPopup, showPopup }}>
                <div style={{ backgroundColor: "white", padding: "1rem" }}>
                    <p>PopupText</p>
                </div>
            </Popup>
        </>
    );
};
