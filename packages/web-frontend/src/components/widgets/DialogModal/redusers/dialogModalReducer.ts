import { DialogModal, InitialState } from '@/components/widgets/DialogModal/types/DialogModal';

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

export const dialogModalReducer = (
  state: typeof initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case DialogModal.ACTIVE_POPUP:
      return { ...state, activePopup: action.payload };
    case DialogModal.ADDED_USER:
      return { ...state, addedUser: action.payload };
    case DialogModal.INVITATION_COMPANION:
      return { ...state, invitationCompanion: action.payload };
    case DialogModal.INVITATION_SELECTED_COMPANIONS:
      return { ...state, invitationSelectedCompanions: action.payload };
    case DialogModal.DELETE_COMPANION:
      return { ...state, deleteCompanion: action.payload };
    case DialogModal.DELETE_SELECTED_COMPANIONS:
      return { ...state, deleteSelectedCompanions: action.payload };
    case DialogModal.SELECTED_EVENT:
      return { ...state, selectedEvent: action.payload };
    case DialogModal.DISABLE_BUTTON:
      return { ...state, disableButton: action.payload };
    case DialogModal.SUCCESS_MODAL_OPEN:
      return { ...state, successModalOpen: action.payload };
    case DialogModal.RESET_ALL_POPUPS:
      return initialState;
    default:
      return state;
  }
};
