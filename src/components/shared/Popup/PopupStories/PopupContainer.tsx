import { FC, useRef, useState } from "react";
import Popup from "@/components/shared/Popup/Popup";

export const PopupContainer: FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const container = useRef<HTMLDivElement>(null);
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
            <div ref={container} style={{ position: "relative", zIndex: 0 }}>
                container
            </div>
            <p>SomeText</p>
            <p>SomeText</p>
            <p>SomeText</p>
            <p>SomeText</p>
            {container.current && (
                <Popup
                    style={{ backgroundColor: "red", color: "white", padding: "1rem" }}
                    {...{
                        setShowPopup,
                        showPopup,
                        containerElement: container.current,
                        wrapperProps: {
                            style: {
                                position: "absolute",
                                right: "auto",
                                bottom: "auto",
                                top: "auto",
                                left: "2rem",
                                zIndex: 1,
                                padding: "1rem",
                            },
                        },
                    }}
                >
                    <div>
                        <p>PopupText</p>
                    </div>
                </Popup>
            )}
        </>
    );
};
