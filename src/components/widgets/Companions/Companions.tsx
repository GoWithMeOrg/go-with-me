"use client";

import { FC } from "react";

import { CardCompanion } from "@/components/widgets/CardCompanion";
import { DeleteFriendModal } from "@/components/widgets/DeleteFriendModal";

import { Title } from "@/components/shared/Title";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { FilteredList } from "@/components/shared/FilteredList";
import { Avatar } from "@/components/shared/Avatar";
import { Span } from "@/components/shared/Span";
import { Popup } from "@/components/shared/Popup";
import { Button } from "@/components/shared/Button";

import { useCompanions } from "./hooks/useCompanions";

import Plus from "@/assets/icons/plus.svg";
import Search from "@/assets/icons/search.svg";
import ClearInput from "@/assets/icons/clearInput.svg";

import classes from "./Companions.module.css";

// TODO: При клике на плюс тоже вызываем попап?.
// TODO: Добавить попап с вопросом об удаление одного или нескольких друзей
// TODO: Добавить попап с вопросом об приглашении одного или нескольких друзей
// TODO: При клике на карточку переходим на страницу компаниона
// TODO: При клике на на минус на карточке вызываем попап
// TODO: Что происходит при клике на конверт?
// TODO: Что происходит при клике на сообщение?
// TODO: Определиться с рассылкой инвайтов.

const Companions: FC = () => {
    const {
        handleFindUsers,
        handleFindCompanion,
        findUsers,
        companions,
        called,
        companionRequest,
        searchValue,
        searchValueCompanion,
        clearInput,
        clearInputCompanion,
        showAllCompanions,
        select,
        limit,
        selectCompanions,
        showPopup,
        setShowPopup,
        handleShowPopup,
        handleHidePopup,
        handleCheckboxChange,
        deleteCheckedCards,
        checkedMapObj,
        defaulShowCompanions,
        totalCompanions,
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
                        <div key={card._id}>
                            <div className={classes.avatar}>
                                <Avatar name={card.name} image={card.image} scale={1.8} id={card._id} />

                                <Plus className={classes.addCompanion} onClick={() => companionRequest(card._id)} />
                            </div>

                            <Span title={card.name.split(" ")[0]} className={classes.name} />
                            <Span title={card.name.split(" ")[1]} className={classes.name} />
                        </div>
                    ))
                )}
            </FilteredList>

            {companions?.length > 0 && (
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
                                <ClearInput className={classes.searchIconCompanions} onClick={clearInputCompanion} />
                            )}
                        </Label>

                        <Button
                            resetDefaultStyles
                            className={classes.buttonText && select ? classes.buttonActive : classes.buttonText}
                            onClick={selectCompanions}
                        >
                            Select
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

                        {select && checkedMapObj > 0 && (
                            <div className={classes.buttonsDelAndInvite}>
                                <Button onClick={() => console.log("Send invitations")}>Отправить инвайты</Button>
                                <Button className={classes.delete} onClick={handleShowPopup}>
                                    Удалить компанионов
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Popup popupMode={"map"} showPopup={showPopup} setShowPopup={setShowPopup}>
                <DeleteFriendModal companionCounter={checkedMapObj}>
                    <Button className={classes.delete} onClick={deleteCheckedCards}>
                        Yes
                    </Button>
                    <Button onClick={handleHidePopup}>Cancel</Button>
                </DeleteFriendModal>
            </Popup>
        </div>
    );
};
export default Companions;
