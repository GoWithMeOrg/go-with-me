import { useState } from "react";

export const usePopup = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleShowAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    return {
        showPopup,
        setShowPopup,
        handleShowAuth,
    };
};
