import { useState } from "react";
import { useMutation } from "@apollo/client";

import { usePopup } from "@/components/shared/Popup/hooks";
import { useUserID } from "@/hooks/useUserID";
import { useInvitationEvents } from "./useInvitationEvents";

import { SEND_INVITATION_MUTATION } from "@/app/api/graphql/mutations/invations";

export interface CompanionsDialogModalProps {
    receiver_id?: string;
}

export const useDialogModal = ({ receiver_id }: CompanionsDialogModalProps) => {
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

    const receiver = receiver_id === undefined ? invitationCompanion?.id : receiver_id;

    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [disabledBtn, setDisabledBtn] = useState(true);

    const [SendInvitation] = useMutation(SEND_INVITATION_MUTATION);

    const invitationEventsHook = useInvitationEvents();

    const openPopup = (popupId: string) => {
        setActivePopup(popupId);
        handleShowPopup();
    };

    const closePopup = () => {
        handleHidePopup();
        setSelectedEvent(null);
        setDisabledBtn(true);
        setActivePopup(null);
        resetAllPopups();
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

    const handleSelectEvent = (id: string) => {
        setSelectedEvent(id);
        setDisabledBtn(false);

        const sendInvation = async () => {
            try {
                await SendInvitation({
                    variables: {
                        eventId: id,
                        senderId: user_id,
                        receiverIds: receiver,
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
        selectedEvent,
        events: invitationEventsHook.events,
    };
};
