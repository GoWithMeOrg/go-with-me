import { InitialState } from "@/components/widgets/DialogModal/types/DialogModal";

export const initialState: InitialState = {
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

export const dialogModalReducer = (state: typeof initialState, action: { type: string; payload?: any }) => {
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
