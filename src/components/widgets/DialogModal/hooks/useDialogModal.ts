import { useReducer } from "react";
import { useMutation } from "@apollo/client";

import { usePopup } from "@/components/shared/Popup/hooks";
import { useUserID } from "@/hooks/useUserID";
import { useInvitationEvents } from "./useInvitationEvents";

import { SEND_INVITATION_MUTATION } from "@/app/api/graphql/mutations/invations";

import { CompanionsDialogModalProps } from "@/components/widgets/DialogModal/types/DialogModal";
import { dialogModalReducer, initialState } from "@/components/widgets/DialogModal/redusers/dialogModalReducer";
import { DialogModal } from "@/components/widgets/DialogModal/types/DialogModal";
export const useDialogModal = ({ receiver_ids, resetCards }: CompanionsDialogModalProps) => {
    const { user_id } = useUserID();
    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup, container, popupCss, refPopup } = usePopup({
        popupMode: "map",
    });

    const [state, dispatch] = useReducer(dialogModalReducer, initialState);

    const receivers = state.invitationCompanion?.id !== undefined ? state.invitationCompanion?.id : receiver_ids;

    const [SendInvitation] = useMutation(SEND_INVITATION_MUTATION);

    const invitationEventsHook = useInvitationEvents();

    const openPopup = (popupId: string) => {
        dispatch({ type: DialogModal.ACTIVE_POPUP, payload: popupId });
        handleShowPopup();
    };

    const closePopup = () => {
        handleHidePopup();
        dispatch({ type: DialogModal.RESET_ALL_POPUPS, payload: initialState });
    };

    // Отправить заявку в компаньоны
    const openPopupRequestUser = (id: string, name: string) => {
        dispatch({ type: DialogModal.ACTIVE_POPUP, payload: id });
        dispatch({ type: DialogModal.ADDED_USER, payload: { id, name } });
        handleShowPopup();
    };

    // Пригласить компаниона
    const openPopupInvitationCompanion = (id: string, name: string) => {
        dispatch({ type: DialogModal.ACTIVE_POPUP, payload: id });
        dispatch({ type: DialogModal.INVITATION_COMPANION, payload: { id, name } });
        handleShowPopup();
    };

    // Пригласить компаньонов
    const openPopupInvitationCompanions = () => {
        dispatch({
            type: DialogModal.INVITATION_SELECTED_COMPANIONS,
            payload: true,
        });
        handleShowPopup();
    };

    // Удалить компаньона
    const openPopupDeleteCompanion = (id: string, name: string) => {
        dispatch({ type: DialogModal.ACTIVE_POPUP, payload: id });
        dispatch({ type: DialogModal.DELETE_COMPANION, payload: { id, name } });
        handleShowPopup();
    };

    // Удалить компаньонов
    const openPopupDeleteCompanions = () => {
        dispatch({ type: DialogModal.DELETE_SELECTED_COMPANIONS, payload: true });
        handleShowPopup();
    };

    // Выбрать событие
    const handleSelectEvent = (event: any) => {
        dispatch({
            type: DialogModal.SELECTED_EVENT,
            payload: event,
        });
        dispatch({ type: DialogModal.DISABLE_BUTTON, payload: false });
    };

    // Отправить приглашение
    const sendInvation = async () => {
        try {
            await SendInvitation({
                variables: {
                    eventId: state.selectedEvent?._id,
                    senderId: user_id,
                    receiverIds: receivers,
                },
            });
        } catch (error) {
            console.error("Error send invitation: ", error);
        }

        if (receiver_ids.length > 0 && resetCards) {
            resetCards();
            dispatch({ type: DialogModal.INVITATION_SELECTED_COMPANIONS, payload: false });
        }
        dispatch({ type: DialogModal.ACTIVE_POPUP, payload: null });
        dispatch({ type: DialogModal.SUCCESS_MODAL_OPEN, payload: true });
    };

    return {
        showPopup,
        setShowPopup,
        handleShowPopup,
        handleHidePopup,
        container,
        popupCss,
        refPopup,
        openPopup,
        closePopup,
        openPopupRequestUser,
        openPopupInvitationCompanion,
        openPopupInvitationCompanions,
        openPopupDeleteCompanion,
        openPopupDeleteCompanions,
        handleSelectEvent,

        events: invitationEventsHook.events,
        sendInvation,

        state,
        dispatch,
    };
};
