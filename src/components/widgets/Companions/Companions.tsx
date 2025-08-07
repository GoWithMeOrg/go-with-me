"use client";

import { FC } from "react";

import dayjs from "dayjs";

import { CardCompanion } from "@/components/widgets/CardCompanion";
import { CardAddCompanion } from "@/components/widgets/CardAddCompanion";
import { DialogModal, DialogMode } from "@/components/widgets/DialogModal/DialogModal";

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
// import Plus from "@/assets/icons/plus.svg";
// import Checkbox from "@/assets/icons/checkbox.svg";

import classes from "./Companions.module.css";
import InvationEvent from "../DialogModal/InvationEvent/InvationEvent";

// TODO: Сверстать попапы по макету

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
        handleHidePopup,
        popupCss,
        refPopup,
        handleCheckboxChange,
        deleteCheckedCompanions,
        checkedCompanionsCounter,
        defaulShowCompanions,
        totalCompanions,

        addedUser,
        setAddedUser,

        delCompanion,
        setDelCompanion,
        deleteCompanion,

        openPopup,
        closePopup,
        itemContentCss,
        plusIconCss,
        activePopup,
        openPopupInvation,
        openPopupDelete,
        handleSelectEvent,
        selectedEvent,
        disabledBtn,

        invitationCompanion,
        setInvitationCompanion,
        invitationSelectedCompanions,

        events,

        delSelectedCompanions,
        checkedCompanions,
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
                            onShowPopup={() => openPopup(card._id)}
                            setAddedUser={setAddedUser}
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
                                    onShowPopup={() => openPopup(card._id)}
                                    setInvitateCompanion={setInvitationCompanion}
                                    setDelCompanion={setDelCompanion}
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
                                    <Button onClick={() => openPopupInvation()}>Отправить инвайты</Button>
                                    <Button className={classes.delete} onClick={() => openPopupDelete()}>
                                        Удалить компанионов
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <Popup showPopup={showPopup} popupCss={popupCss} refPopup={refPopup}>
                        {/* Отправить заявку в компанионы */}
                        {addedUser?.id === activePopup && (
                            <DialogModal name={addedUser?.name} mode={DialogMode.ADD}>
                                <Button className={classes.delete} onClick={() => sendRequestCompanion(addedUser?.id)}>
                                    Yes
                                </Button>
                                <Button onClick={handleHidePopup}>Cancel</Button>
                            </DialogModal>
                        )}

                        {/* Удалить из компанионов */}
                        {delCompanion?.id === activePopup && (
                            <DialogModal name={delCompanion?.name} mode={DialogMode.DEL}>
                                <Button className={classes.delete} onClick={() => deleteCompanion(delCompanion?.id)}>
                                    Yes
                                </Button>
                                <Button onClick={handleHidePopup}>Cancel</Button>
                            </DialogModal>
                        )}

                        {/* Пригласить компаниона */}
                        {invitationCompanion?.id === activePopup && (
                            <DialogModal
                                name={invitationCompanion?.name}
                                mode={DialogMode.INVITATION}
                                closePopup={closePopup}
                                disabled={disabledBtn}
                            >
                                <InvationEvent
                                    data={events}
                                    selectedEvent={selectedEvent}
                                    handleSelectEvent={handleSelectEvent}
                                />
                            </DialogModal>
                        )}

                        {/* Удалить несколько компанионов */}
                        {delSelectedCompanions && checkedCompanions && (
                            <DialogModal companionCounter={checkedCompanionsCounter} mode={DialogMode.DEL}>
                                <Button className={classes.delete} onClick={deleteCheckedCompanions}>
                                    Yes
                                </Button>
                                <Button onClick={handleHidePopup}>Cancel</Button>
                            </DialogModal>
                        )}

                        {/* Пригласить несколько компанионов */}
                        {invitationSelectedCompanions && checkedCompanions && (
                            <DialogModal companionCounter={checkedCompanionsCounter} mode={DialogMode.INVITATION}>
                                <FilteredList className={classes.companionsList}>
                                    {events?.map((event: any) => <div key={event._id}>{event.name}</div>)}
                                </FilteredList>

                                {/* <Button className={classes.delete} onClick={() => console.log("Отправить приглашение")}>
                                    Yes
                                </Button>
                                <Button onClick={handleHidePopup}>Cancel</Button> */}
                            </DialogModal>
                        )}
                    </Popup>
                </>
            )}
        </div>
    );
};
export default Companions;
