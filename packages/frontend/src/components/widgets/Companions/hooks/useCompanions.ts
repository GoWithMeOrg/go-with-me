import { useMemo } from 'react';
import { GET_PRIVACY_SETTINGS_FOR_USERS } from '@/app/graphql/queries/privacySetting';
import { PrivacySetting } from '@/app/graphql/types';
import { useDialogModal } from '@/components/widgets/DialogModal/hooks/useDialogModal';
import { DialogModal } from '@/components/widgets/DialogModal/types/DialogModal';
import { useQuery } from '@apollo/client/react';

import { useCompanionSearch } from './useCompanionSearch';
import { useCompanionSelection } from './useCompanionSelection';

export const useCompanions = () => {
    // Хуки декомпозиции
    const companionSearchHook = useCompanionSearch();
    const selectionHook = useCompanionSelection();
    const popupsHook = useDialogModal({
        receiver_ids: selectionHook.receiverIds,
        resetCards: selectionHook.selectCompanions,
    });

    const companions = companionSearchHook.companions;

    const companionIds = useMemo(
        () => companions?.map((c) => c._id) ?? [],
        [companions],
    );

    const { data: privacyData } = useQuery(GET_PRIVACY_SETTINGS_FOR_USERS, {
        variables: { userIds: companionIds },
        skip: companionIds.length === 0,
    });

    const companionCanInvite = useMemo(() => {
        const settings: PrivacySetting[] = (
            privacyData as { privacySettingsForUsers: PrivacySetting[] } | undefined
        )?.privacySettingsForUsers ?? [];

        const map: Record<string, boolean> = {};

        for (const s of settings) {
            const ownerId = s.ownerId;
            if (s.whoCanInviteToEvents === 'EVERYONE') {
                map[ownerId] = true;
            } else if (s.whoCanInviteToEvents === 'COMPANIONS') {
                map[ownerId] = true;
            } else if (s.whoCanInviteToEvents === 'MARKED_COMPANIONS') {
                map[ownerId] =
                    s.markedForWhoCanInviteToEvents?.includes(
                        companionSearchHook.user_id ?? '',
                    ) ?? false;
            } else {
                map[ownerId] = false;
            }
        }

        return map;
    }, [privacyData, companionSearchHook.user_id]);

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
        popupsHook.dispatch({ type: DialogModal.DELETE_COMPANION, payload: null });
        popupsHook.handleHidePopup();
    };

    // Отправка запроса на добавление компаньона
    const sendRequestCompanion = (card_id: string) => {
        companionSearchHook.companionRequest(card_id);
        popupsHook.handleHidePopup();
    };

    return {
        sendRequestCompanion,
        companionCanInvite,
        // Поиск и управление компаньонами
        companions: companionSearchHook.companions,
        searchDataCompanion: companionSearchHook.searchDataCompanion,
        calledCompanion: companionSearchHook.calledCompanion,
        clearSearchCompanion: companionSearchHook.clearSearchCompanion,
        loadingCompanion: companionSearchHook.loadingCompanion,
        searchValueCompanion: companionSearchHook.searchValueCompanion,
        handleSearchCompanion: companionSearchHook.handleSearchCompanion,

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
        events: popupsHook.events,
        // Прочее
        defaulShowCompanions: companionSearchHook.defaulShowCompanions,
        limit: companionSearchHook.limit,
        setLimit: companionSearchHook.setLimit,
        showAllCompanions: companionSearchHook.showAllCompanions,

        deleteCompanion,

        state: popupsHook.state,
    };
};
