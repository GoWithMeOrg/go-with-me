export enum DialogModal {
  ACTIVE_POPUP = 'SET_ACTIVE_POPUP',
  ADDED_USER = 'SET_ADDED_USER',
  INVITATION_COMPANION = 'SET_INVITATION_COMPANION',
  INVITATION_SELECTED_COMPANIONS = 'SET_INVITATION_SELECTED_COMPANIONS',
  DELETE_COMPANION = 'SET_DELETE_COMPANION',
  DELETE_SELECTED_COMPANIONS = 'SET_DELETE_SELECTED_COMPANIONS',
  SELECTED_EVENT = 'SET_SELECTED_EVENT',
  DISABLE_BUTTON = 'SET_DISABLE_BUTTON',
  SUCCESS_MODAL_OPEN = 'SET_SUCCESS_MODAL_OPEN',
  RESET_ALL_POPUPS = 'RESET_ALL_POPUPS',
}

export type InitialState = {
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
