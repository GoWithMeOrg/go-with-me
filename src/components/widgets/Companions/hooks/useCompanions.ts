import { useState } from "react";
import { useFindUsers } from "./useFindUsers";
import { useCompanionSearch } from "./useCompanionSearch";
import { useCompanionPopups } from "./useCompanionPopups";
import { useCompanionSelection } from "./useCompanionSelection";
import { useOrganizerEvents } from "./useOrganizerEvents";

export const useCompanions = () => {
    // Основные состояния
    const defaulShowCompanions = 12;
    const [limit, setLimit] = useState<number>(defaulShowCompanions);

    // Хуки декомпозиции
    const findUsersHook = useFindUsers();
    const companionSearchHook = useCompanionSearch(limit);
    const popupsHook = useCompanionPopups();
    const selectionHook = useCompanionSelection();
    const organizerEventsHook = useOrganizerEvents();

    // Показать всех компаньонов (лимит)
    const showAllCompanions = () => {
        setLimit(limit === 0 ? limit : 0);
    };

    // Массовое удаление выбранных компаньонов
    const deleteCheckedCompanions = () => {
        Object.entries(selectionHook.checkedCompanions).forEach(([id, isChecked]) => {
            if (isChecked) {
                companionSearchHook.removeCompanion(id);
            }
        });
        selectionHook.clearChecked();
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
        handleShowPopup: popupsHook.handleShowPopup,
        handleHidePopup: popupsHook.handleHidePopup,
        container: popupsHook.container,
        popupCss: popupsHook.popupCss,
        refPopup: popupsHook.refPopup,
        activePopup: popupsHook.activePopup,
        setActivePopup: popupsHook.setActivePopup,
        addedUser: popupsHook.addedUser,
        setAddedUser: popupsHook.setAddedUser,
        openPopup: popupsHook.openPopup,
        closePopup: popupsHook.closePopup,
        itemContentCss: popupsHook.itemContentCss,
        plusIconCss: popupsHook.plusIconCss,
        handleSelectEvent: popupsHook.handleSelectEvent,
        disabledBtn: popupsHook.disabledBtn,
        selectedEvent: popupsHook.selectedEvent,
        openPopupInvation: popupsHook.openPopupInvation,
        openPopupDelete: popupsHook.openPopupDelete,
        delCompanion: popupsHook.delCompanion,
        setDelCompanion: popupsHook.setDelCompanion,
        delSelectedCompanions: popupsHook.delSelectedCompanions,
        setDelSelectedCompanions: popupsHook.setDelSelectedCompanions,
        invitationCompanion: popupsHook.invitationCompanion,
        setInvitationCompanion: popupsHook.setInvitationCompanion,
        invitationSelectedCompanions: popupsHook.invitationSelectedCompanions,
        setInvitationSelectedCompanions: popupsHook.setInvitationSelectedCompanions,
        // События организатора
        events: organizerEventsHook.events,
        // Прочее
        defaulShowCompanions,
        limit,
        setLimit,
        showAllCompanions,

        deleteCompanion,
    };
};
