import { useState } from "react";
import { usePopup } from "@/components/shared/Popup/hooks";

export const useCompanionPopups = () => {
    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup, container, popupCss, refPopup } = usePopup({
        popupMode: "map",
    });
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [addedUser, setAddedUser] = useState<{ id: string; name: string } | null>(null);
    const [delCompanion, setDelCompanion] = useState<{ id: string; name: string } | null>(null);
    const [invitationCompanion, setInvitationCompanion] = useState<{ id: string; name: string } | null>(null);
    const [delSelectedCompanions, setDelSelectedCompanions] = useState<boolean>(false);
    const [invitationSelectedCompanions, setInvitationSelectedCompanions] = useState<boolean>(false);

    const openPopup = (popupId: string) => {
        setActivePopup(popupId);
        handleShowPopup();
    };
    // Сброс всех popup-состояний
    const resetAllPopups = () => {
        setActivePopup(null);
        setAddedUser(null);
        setDelCompanion(null);
        setInvitationCompanion(null);
        setDelSelectedCompanions(false);
        setInvitationSelectedCompanions(false);
    };

    const openPopupInvation = () => {
        resetAllPopups();
        setInvitationSelectedCompanions(true);
        handleShowPopup();
    };
    const openPopupDelete = () => {
        resetAllPopups();
        setDelSelectedCompanions(true);
        handleShowPopup();
    };

    return {
        showPopup,
        setShowPopup,
        handleShowPopup,
        handleHidePopup,
        container,
        popupCss,
        refPopup,
        activePopup,
        setActivePopup,
        addedUser,
        setAddedUser,
        delCompanion,
        setDelCompanion,
        invitationCompanion,
        setInvitationCompanion,
        delSelectedCompanions,
        setDelSelectedCompanions,
        invitationSelectedCompanions,
        setInvitationSelectedCompanions,
        openPopup,
        openPopupInvation,
        openPopupDelete,
        resetAllPopups,
    };
};
