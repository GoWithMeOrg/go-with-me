import { useFindUsers } from "./useFindUsers";
import { useCompanionSearch } from "./useCompanionSearch";
import { useCompanionSelection } from "./useCompanionSelection";
import { useDialogModal } from "@/components/widgets/DialogModal/hooks/useDialogModal";
import { useInvitationEvents } from "@/components/widgets/DialogModal/hooks/useInvitationEvents";

export const useCompanions = () => {
    // Хуки декомпозиции
    const findUsersHook = useFindUsers();
    const companionSearchHook = useCompanionSearch();
    const selectionHook = useCompanionSelection();
    const invitationEventsHook = useInvitationEvents();
    const popupsHook = useDialogModal({
        receiver_ids: selectionHook.receiverIds,
        resetCards: selectionHook.selectCompanions,
    });

    // Массовое удаление выбранных компаньонов
    const deleteCheckedCompanions = () => {
        Object.entries(selectionHook.checkedCompanions).forEach(([id, isChecked]) => {
            if (isChecked) {
                companionSearchHook.removeCompanion(id);
            }
        });
        selectionHook.setCheckedCompanions({});
        companionSearchHook.refetchCompanions();
        selectionHook.selectCompanions();
        popupsHook.handleHidePopup();
    };

    // Удаление одного компаньона
    const deleteCompanion = (card_id: string) => {
        companionSearchHook.removeCompanion(card_id);
        popupsHook.handleHidePopup();
    };

    // Отправка запроса на добавление компаньона
    const sendRequestCompanion = (card_id: string) => {
        companionSearchHook.companionRequest(card_id);
        findUsersHook.refetch();
        popupsHook.handleHidePopup();
    };

    return {
        // Поиск пользователей
        handleFindUsers: findUsersHook.handleFindUsers,
        searchValue: findUsersHook.searchValue,
        setSearchValue: findUsersHook.setSearchValue,
        clearInput: findUsersHook.clearInput,
        findUsers: findUsersHook.findUsers,
        called: findUsersHook.called,
        sendRequestCompanion,
        // Поиск и управление компаньонами
        handleFindCompanion: companionSearchHook.handleFindCompanion,
        searchValueCompanion: companionSearchHook.searchValueCompanion,
        setSearchValueCompanion: companionSearchHook.setSearchValueCompanion,
        clearInputCompanion: companionSearchHook.clearInputCompanion,
        companions: companionSearchHook.companions,
        totalCompanions: companionSearchHook.totalCompanions,
        removeCompanion: companionSearchHook.removeCompanion,
        companionRequest: companionSearchHook.companionRequest,
        refetchCompanions: companionSearchHook.refetchCompanions,
        // Выбор и массовые действия
        select: selectionHook.select,
        selectCompanions: selectionHook.selectCompanions,
        checkedCompanions: selectionHook.checkedCompanions,
        setCheckedCompanions: selectionHook.setCheckedCompanions,
        handleCheckboxChange: selectionHook.handleCheckboxChange,
        checkedCompanionsCounter: selectionHook.checkedCompanionsCounter,
        deleteCheckedCompanions,
        // Попапы
        showPopup: popupsHook.showPopup,
        setShowPopup: popupsHook.setShowPopup,
        openPopup: popupsHook.openPopup,
        closePopup: popupsHook.closePopup,
        handleShowPopup: popupsHook.handleShowPopup,
        handleHidePopup: popupsHook.handleHidePopup,
        container: popupsHook.container,
        popupCss: popupsHook.popupCss,
        refPopup: popupsHook.refPopup,
        handleSelectEvent: popupsHook.handleSelectEvent,

        sendInvation: popupsHook.sendInvation,
        openPopupRequestUser: popupsHook.openPopupRequestUser,
        openPopupDeleteCompanion: popupsHook.openPopupDeleteCompanion,
        openPopupDeleteCompanions: popupsHook.openPopupDeleteCompanions,
        openPopupInvitationCompanion: popupsHook.openPopupInvitationCompanion,
        openPopupInvitationCompanions: popupsHook.openPopupInvitationCompanions,

        // События организатора
        events: invitationEventsHook.events,
        // Прочее
        defaulShowCompanions: companionSearchHook.defaulShowCompanions,
        limit: companionSearchHook.limit,
        setLimit: companionSearchHook.setLimit,
        showAllCompanions: companionSearchHook.showAllCompanions,

        deleteCompanion,

        state: popupsHook.state,
    };
};
