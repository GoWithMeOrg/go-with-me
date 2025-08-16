"use client";

import { FC } from "react";

import { CardCompanion } from "@/components/widgets/CardCompanion";
import { CardAddCompanion } from "@/components/widgets/CardAddCompanion";
import { DialogModal, DialogMode } from "@/components/widgets/DialogModal/DialogModal";
import { InvationEvent } from "@/components/widgets/DialogModal/InvationEvent/InvationEvent";
import { SuccessModal } from "@/components/widgets/SuccessModal/SuccessModal";

import { Title } from "@/components/shared/Title";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { FilteredList } from "@/components/shared/FilteredList";
import { Span } from "@/components/shared/Span";
import { Popup } from "@/components/shared/Popup";
import { Button } from "@/components/shared/Button";

import { useCompanions } from "./hooks/useCompanions";

import Search from "@/assets/icons/search.svg";
import ClearInput from "@/assets/icons/clearInput.svg";

import classes from "./Companions.module.css";

const Companions: FC = () => {
    const {
        handleFindUsers,
        handleFindCompanion,
        sendRequestCompanion,
        findUsers,
        companions,
        called,
        searchValue,
        searchValueCompanion,
        clearInput,
        clearInputCompanion,
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
    } = useCompanions();

    return (
        <div className={classes.searchCompanions}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Find new companions" />
            </div>

            <div className={classes.filters}>
                <Label label={"Search by name or email"} className={classes.findCompanions}>
                    <Input
                        onChange={handleFindUsers}
                        type="text"
                        className={classes.findInput}
                        value={searchValue ?? ""}
                    />
                    {searchValue === "" && <Search className={classes.searchIcon} />}

                    {searchValue !== "" && <ClearInput className={classes.searchIcon} onClick={clearInput} />}
                </Label>
            </div>

            <FilteredList className={classes.filteredList}>
                {called && searchValue && findUsers?.length === 0 ? (
                    <Span title={"По вашему запросу ничего не найдено"} />
                ) : (
                    findUsers.map((card: any) => (
                        <CardAddCompanion
                            key={card._id}
                            id={card._id}
                            name={card.name}
                            image={card.image}
                            onClickPopupRequest={() => openPopupRequestUser(card._id, card.name)}
                        />
                    ))
                )}
            </FilteredList>

            {companions?.length > 0 && (
                <>
                    <div className={classes.companions}>
                        <div className={classes.header}>
                            <Title tag={"h3"} title="My companions" />
                        </div>

                        <div className={classes.line}></div>

                        <div className={classes.filtersCompanion}>
                            <Label label={""} className={classes.findCompanions}>
                                <Input
                                    onChange={handleFindCompanion}
                                    type="text"
                                    className={classes.findInput}
                                    value={searchValueCompanion ?? ""}
                                />
                                {searchValueCompanion === "" && <Search className={classes.searchIconCompanions} />}

                                {searchValueCompanion !== "" && (
                                    <ClearInput
                                        className={classes.searchIconCompanions}
                                        onClick={clearInputCompanion}
                                    />
                                )}
                            </Label>

                            <Button
                                resetDefaultStyles
                                className={classes.buttonText && select ? classes.buttonActive : classes.buttonText}
                                onClick={selectCompanions}
                            >
                                {select ? "Cancel" : "Select"}
                            </Button>
                        </div>

                        <FilteredList className={classes.companionsList}>
                            {companions?.map((card: any) => (
                                <CardCompanion
                                    id={card._id}
                                    name={card.name}
                                    image={card.image}
                                    key={card._id}
                                    onChange={(isChecked) => handleCheckboxChange(card._id, isChecked)}
                                    select={select}
                                    checked={checkedCompanions[card._id] ?? false}
                                    onClickPopupInvitation={() => openPopupInvitationCompanion(card._id, card.name)}
                                    onClickPopupDelete={() => openPopupDeleteCompanion(card._id, card.name)}
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
                                        ? "Hide"
                                        : "Show all companions " + `(${totalCompanions})`}
                                </Button>
                            )}

                            {select && checkedCompanionsCounter > 0 && (
                                <div className={classes.buttonsDelAndInvite}>
                                    <Button onClick={() => openPopupInvitationCompanions()}>Отправить инвайты</Button>
                                    <Button className={classes.delete} onClick={() => openPopupDeleteCompanions()}>
                                        Удалить компанионов
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <Popup showPopup={showPopup} popupCss={popupCss} refPopup={refPopup}>
                        {/* Отправить заявку в компанионы */}
                        {state.addedUser?.id === state.activePopup && (
                            <DialogModal name={state.addedUser?.name} mode={DialogMode.ADD} closePopup={closePopup}>
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
                </>
            )}
        </div>
    );
};

export default Companions;
