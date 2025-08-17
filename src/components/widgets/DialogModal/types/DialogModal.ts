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
