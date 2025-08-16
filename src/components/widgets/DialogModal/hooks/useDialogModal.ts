import { useReducer, useState } from "react";
import { useMutation } from "@apollo/client";

import { usePopup } from "@/components/shared/Popup/hooks";
import { useUserID } from "@/hooks/useUserID";
import { useInvitationEvents } from "./useInvitationEvents";

import { SEND_INVITATION_MUTATION } from "@/app/api/graphql/mutations/invations";

type InitialState = {
    activePopup: string | null;
    addedUser: {
        id: string;
        name: string;
    } | null;
    invitationCompanion: {
        id: string;
        name: string;
    } | null;
    invitationSelectedCompanions: boolean;
    deleteCompanion: {
        id: string;
        name: string;
    } | null;
    deleteSelectedCompanions: boolean;
    selectedEvent: {
        _id: string;
        name: string;
        startDate: string;
    } | null;

    disableButton: boolean;
    successModalOpen: boolean;
};
export interface CompanionsDialogModalProps {
    receiver_ids: string[];
    resetCards?: () => void; // Функция для сброса выбранных карточек
}

export const useDialogModal = ({ receiver_ids, resetCards }: CompanionsDialogModalProps) => {
    const { user_id } = useUserID();
    const { showPopup, setShowPopup, handleShowPopup, handleHidePopup, container, popupCss, refPopup } = usePopup({
        popupMode: "map",
    });

    const initialState: InitialState = {
        activePopup: null,
        addedUser: null,
        invitationCompanion: null,
        invitationSelectedCompanions: false,
        deleteCompanion: null,
        deleteSelectedCompanions: false,
        selectedEvent: null,
        disableButton: true,
        successModalOpen: false,
    };

    const reducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
        switch (action.type) {
            case "SET_ACTIVE_POPUP":
                return { ...state, activePopup: action.payload };
            case "SET_ADDED_USER":
                return { ...state, addedUser: action.payload };
            case "SET_INVITATION_COMPANION":
                return { ...state, invitationCompanion: action.payload };
            case "SET_INVITATION_SELECTED_COMPANIONS":
                return { ...state, invitationSelectedCompanions: action.payload };
            case "SET_DELETE_COMPANION":
                return { ...state, deleteCompanion: action.payload };
            case "SET_DELETE_SELECTED_COMPANIONS":
                return { ...state, deleteSelectedCompanions: action.payload };
            case "SET_SELECTED_EVENT":
                return { ...state, selectedEvent: action.payload };
            case "SET_DISABLE_BUTTON":
                return { ...state, disableButton: action.payload };
            case "SET_SUCCESS_MODAL_OPEN":
                return { ...state, successModalOpen: action.payload };
            case "RESET_ALL_POPUPS":
                return initialState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const receivers = state.invitationCompanion?.id !== undefined ? state.invitationCompanion?.id : receiver_ids;

    const [SendInvitation] = useMutation(SEND_INVITATION_MUTATION);

    const invitationEventsHook = useInvitationEvents();

    const openPopup = (popupId: string) => {
        dispatch({ type: "SET_ACTIVE_POPUP", payload: popupId });
        handleShowPopup();
    };

    const closePopup = () => {
        handleHidePopup();
        dispatch({ type: "RESET_ALL_POPUPS", payload: initialState });
    };

    // Отправить заявку в компаньоны
    const openPopupRequestUser = (id: string, name: string) => {
        dispatch({ type: "SET_ACTIVE_POPUP", payload: id });
        dispatch({ type: "SET_ADDED_USER", payload: { id, name } });
        handleShowPopup();
    };

    // Пригласить компаниона
    const openPopupInvitationCompanion = (id: string, name: string) => {
        dispatch({ type: "SET_ACTIVE_POPUP", payload: id });
        dispatch({ type: "SET_INVITATION_COMPANION", payload: { id, name } });
        handleShowPopup();
    };

    // Пригласить компаньонов
    const openPopupInvitationCompanions = () => {
        dispatch({
            type: "SET_INVITATION_SELECTED_COMPANIONS",
            payload: true,
        });
        handleShowPopup();
    };

    // Удалить компаньона
    const openPopupDeleteCompanion = (id: string, name: string) => {
        dispatch({ type: "SET_ACTIVE_POPUP", payload: id });
        dispatch({ type: "SET_DELETE_COMPANION", payload: { id, name } });
        handleShowPopup();
    };

    // Удалить компаньонов
    const openPopupDeleteCompanions = () => {
        dispatch({ type: "SET_DELETE_SELECTED_COMPANIONS", payload: true });
        handleShowPopup();
    };

    // Выбрать событие
    const handleSelectEvent = (event: any) => {
        dispatch({
            type: "SET_SELECTED_EVENT",
            payload: event,
        });
        dispatch({ type: "SET_DISABLE_BUTTON", payload: false });
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
            dispatch({ type: "SET_INVITATION_SELECTED_COMPANIONS", payload: false });
        }
        dispatch({ type: "SET_ACTIVE_POPUP", payload: null });
        dispatch({ type: "SET_SUCCESS_MODAL_OPEN", payload: true });
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
    };
};
