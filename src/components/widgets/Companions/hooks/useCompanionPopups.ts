import { useState } from "react";
import { usePopup } from "@/components/shared/Popup/hooks";
import { useUserID } from "@/hooks/useUserID";
import { useMutation } from "@apollo/client";
import { SEND_INVITATION_MUTATION } from "@/app/api/graphql/mutations/invations";

import classes from "@/components/widgets/Companions/Companions.module.css";

export const useCompanionPopups = () => {
    const { user_id } = useUserID();
    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup, container, popupCss, refPopup } = usePopup({
        popupMode: "map",
    });
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [addedUser, setAddedUser] = useState<{ id: string; name: string } | null>(null);
    const [delCompanion, setDelCompanion] = useState<{ id: string; name: string } | null>(null);
    const [invitationCompanion, setInvitationCompanion] = useState<{ id: string; name: string } | null>(null);
    const [delSelectedCompanions, setDelSelectedCompanions] = useState<boolean>(false);
    const [invitationSelectedCompanions, setInvitationSelectedCompanions] = useState<boolean>(false);

    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [disabledBtn, setDisabledBtn] = useState(true);

    const itemContentCss = [classes.itemContent, selectedEvent && classes.selected].filter(Boolean).join(" ");
    const plusIconCss = [classes.plus, !selectedEvent && classes.plusHover].filter(Boolean).join(" ");

    const [SendInvitation] = useMutation(SEND_INVITATION_MUTATION);

    const openPopup = (popupId: string) => {
        setActivePopup(popupId);
        handleShowPopup();
    };

    const closePopup = () => {
        handleHidePopup();
        setSelectedEvent(null);
        setDisabledBtn(true);
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

    // console.log(id);
    const handleSelectEvent = (id: string) => {
        setSelectedEvent(id);
        setDisabledBtn(false);

        const sendInvation = async () => {
            try {
                await SendInvitation({
                    variables: {
                        eventId: id,
                        senderId: user_id,
                        receiverIds: invitationCompanion?.id,
                    },
                });
            } catch (error) {
                console.error("Error send invitation: ", error);
            }
        };

        sendInvation();
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
        closePopup,
        openPopupInvation,
        handleSelectEvent,
        openPopupDelete,
        resetAllPopups,
        disabledBtn,
        itemContentCss,
        plusIconCss,
        selectedEvent,
    };
};
