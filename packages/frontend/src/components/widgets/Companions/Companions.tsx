'use client';

import { FC } from 'react';
import { GET_FIND_COMPANION } from '@/app/graphql/queries/companions';
import { FIND_BY_EMAIL_OR_NAME } from '@/app/graphql/queries/users';
import { FindByEmailOrNameQuery, FindByEmailOrNameQueryVariables, User } from '@/app/graphql/types';
import { Button } from '@/components/shared/Button';
import { FilteredList } from '@/components/shared/FilteredList';
import { Popup } from '@/components/shared/Popup';
import { Span } from '@/components/shared/Span';
import { Title } from '@/components/shared/Title';
import { CardAddCompanion } from '@/components/widgets/CardAddCompanion';
import { CardCompanion } from '@/components/widgets/CardCompanion';
import { DialogModal, DialogMode } from '@/components/widgets/DialogModal/DialogModal';
import { InvationEvent } from '@/components/widgets/DialogModal/InvationEvent/InvationEvent';
import { SuccessModal } from '@/components/widgets/SuccessModal/SuccessModal';

import { SearchInput } from '../SearchInput';
import { useSearchInput } from '../SearchInput/hooks/useSearchInput';
import { useCompanions } from './hooks/useCompanions';

import classes from './Companions.module.css';

const Companions: FC = () => {
    const {
        sendRequestCompanion,
        companions,

        showAllCompanions,
        select,
        limit,
        selectCompanions,
        showPopup,

        popupCss,
        refPopup,
        handleCheckboxChange,
        deleteCheckedCompanions,
        checkedCompanionsCounter,
        defaulShowCompanions,
        totalCompanions,

        deleteCompanion,

        closePopup,
        openPopupRequestUser,
        openPopupInvitationCompanion,
        openPopupInvitationCompanions,
        openPopupDeleteCompanion,
        openPopupDeleteCompanions,
        handleSelectEvent,

        sendInvation,

        events,
        checkedCompanions,

        state,

        searchDataCompanion,
        clearSearchCompanion,
        loadingCompanion,
        searchValueCompanion,
        handleSearchCompanion,
    } = useCompanions();

    const {
        handleSearch: handleSearchUsers,
        searchData: searchDataUsers,
        called: calledUsers,
        clearSearch: clearSearchUsers,
        loading: loadingUsers,
        searchValue: searchValueUsers,
    } = useSearchInput<{ findByEmailOrName: User[] }>({
        searchQuery: FIND_BY_EMAIL_OR_NAME,
        dataKey: 'findByEmailOrName',
    });

    return (
        <div className={classes.searchCompanions}>
            <div className={classes.header}>
                <Title tag={'h3'} title="Find new companions" />
            </div>

            <SearchInput
                searchQuery={FIND_BY_EMAIL_OR_NAME}
                onChange={handleSearchUsers}
                onClear={clearSearchUsers}
                loading={loadingUsers}
                value={searchValueUsers}
                label="Search by name or email"
            />

            <FilteredList className={classes.filteredList}>
                {calledUsers && !searchDataUsers && searchDataUsers === 0 ? (
                    <Span title={'По вашему запросу ничего не найдено'} />
                ) : (
                    searchDataUsers.map((card) => (
                        <CardAddCompanion
                            key={card._id}
                            id={card._id}
                            name={`${card.firstName + ' ' + card.lastName}`}
                            image={card.image as string}
                            onClickPopupRequest={() =>
                                openPopupRequestUser(
                                    card._id,
                                    `${card.firstName + ' ' + card.lastName}`
                                )
                            }
                        />
                    ))
                )}
            </FilteredList>

            {companions && companions?.length > 0 && (
                <div className={classes.companions}>
                    <div className={classes.header}>
                        <Title tag={'h3'} title="My companions" />
                    </div>

                    <div className={classes.line}></div>

                    <div className={classes.filtersCompanion}>
                        <SearchInput
                            searchQuery={GET_FIND_COMPANION}
                            onChange={handleSearchCompanion}
                            onClear={clearSearchCompanion}
                            loading={loadingCompanion}
                            value={searchValueCompanion}
                            label=""
                        />

                        <Button
                            resetDefaultStyles
                            className={
                                classes.buttonText && select
                                    ? classes.buttonActive
                                    : classes.buttonText
                            }
                            onClick={selectCompanions}
                        >
                            {select ? 'Cancel' : 'Select'}
                        </Button>
                    </div>

                    <FilteredList className={classes.companionsList}>
                        {companions?.map((card) => (
                            <CardCompanion
                                id={card._id}
                                name={`${card.firstName + ' ' + card.lastName}`}
                                image={card.image as string}
                                key={card._id}
                                onChange={(isChecked) => handleCheckboxChange(card._id, isChecked)}
                                select={select}
                                checked={checkedCompanions[card._id] ?? false}
                                onClickPopupInvitation={() =>
                                    openPopupInvitationCompanion(
                                        card._id,
                                        `${card.firstName + ' ' + card.lastName}`
                                    )
                                }
                                onClickPopupDelete={() =>
                                    openPopupDeleteCompanion(
                                        card._id,
                                        `${card.firstName + ' ' + card.lastName}`
                                    )
                                }
                            />
                        ))}
                    </FilteredList>

                    <div className={classes.buttons}>
                        {companions?.length >= limit && (
                            <Button
                                resetDefaultStyles
                                className={
                                    classes.buttonText && companions.length > limit
                                        ? classes.buttonActive
                                        : classes.buttonText
                                }
                                onClick={showAllCompanions}
                            >
                                {companions.length > defaulShowCompanions
                                    ? 'Hide'
                                    : 'Show all companions ' + `(${totalCompanions})`}
                            </Button>
                        )}

                        {select && checkedCompanionsCounter > 0 && (
                            <div className={classes.buttonsDelAndInvite}>
                                <Button onClick={() => openPopupInvitationCompanions()}>
                                    Отправить инвайты
                                </Button>
                                <Button
                                    className={classes.delete}
                                    onClick={() => openPopupDeleteCompanions()}
                                >
                                    Удалить компанионов
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Popup showPopup={showPopup} popupCss={popupCss} refPopup={refPopup}>
                {/* Отправить заявку в компанионы */}
                {state.addedUser?.id === state.activePopup && (
                    <DialogModal
                        name={state.addedUser?.name}
                        mode={DialogMode.ADD}
                        closePopup={closePopup}
                    >
                        <Button
                            className={classes.yesButton}
                            onClick={() => sendRequestCompanion(state.addedUser?.id)}
                        >
                            Yes
                        </Button>
                        <Button onClick={closePopup} className={classes.cancelButton}>
                            Cancel
                        </Button>
                    </DialogModal>
                )}

                {/* Удалить из компанионов */}
                {state.deleteCompanion?.id === state.activePopup && (
                    <DialogModal
                        name={state.deleteCompanion?.name}
                        mode={DialogMode.DEL}
                        closePopup={closePopup}
                    >
                        <Button
                            className={classes.yesButton}
                            onClick={() => deleteCompanion(state.deleteCompanion?.id)}
                        >
                            Yes
                        </Button>
                        <Button onClick={closePopup} className={classes.cancelButton}>
                            Cancel
                        </Button>
                    </DialogModal>
                )}

                {/* Пригласить компаниона */}
                {state.invitationCompanion?.id === state.activePopup && (
                    <DialogModal
                        name={state.invitationCompanion?.name}
                        mode={DialogMode.INVITATION}
                        closePopup={closePopup}
                        sendInvation={sendInvation}
                        disabled={state.disableButton}
                    >
                        <InvationEvent
                            data={events}
                            selectedEvent={state.selectedEvent}
                            handleSelectEvent={handleSelectEvent}
                        />
                    </DialogModal>
                )}

                {/* Приглашение успешно отправлено одному или нескольким пользователям */}
                {state.successModalOpen && (
                    <SuccessModal
                        closePopup={closePopup}
                        name={state.invitationCompanion?.name}
                        selectedEvent={state.selectedEvent}
                    />
                )}

                {/* Удалить несколько компанионов */}
                {state.deleteSelectedCompanions && checkedCompanions && (
                    <DialogModal
                        companionCounter={checkedCompanionsCounter}
                        mode={DialogMode.DEL}
                        closePopup={closePopup}
                    >
                        <Button className={classes.yesButton} onClick={deleteCheckedCompanions}>
                            Yes
                        </Button>
                        <Button className={classes.cancelButton} onClick={closePopup}>
                            Cancel
                        </Button>
                    </DialogModal>
                )}

                {/* Пригласить несколько компанионов */}
                {state.invitationSelectedCompanions && checkedCompanions && (
                    <DialogModal
                        companionCounter={checkedCompanionsCounter}
                        mode={DialogMode.INVITATION}
                        closePopup={closePopup}
                        sendInvation={sendInvation}
                        disabled={state.disableButton}
                    >
                        <InvationEvent
                            data={events}
                            selectedEvent={state.selectedEvent}
                            handleSelectEvent={handleSelectEvent}
                        />
                    </DialogModal>
                )}
            </Popup>
        </div>
    );
};

export default Companions;
