"use client";

import { FC, useState } from "react";

import { Title } from "@/components/shared/Title";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { FilteredList } from "@/components/shared/FilteredList/FilteredList";
import { Avatar } from "@/components/shared/Avatar";
import { Span } from "@/components/shared/Span";

import { useCompanions } from "./hooks/useCompanions";

import Plus from "@/assets/icons/plus.svg";
import Search from "@/assets/icons/search.svg";
import ClearInput from "@/assets/icons/clearInput.svg";

import { CardCompanion } from "../CardCompanion";
import { Button } from "@/components/shared/Button";

import classes from "./Companions.module.css";

// TODO: При клике на плюс тоже вызываем попап?.
// TODO: Добавить попап с вопрос об удаление одного или нескольких друзей
// TODO: Добавить попап с вопрос об приглашении одного или нескольких друзей
// TODO: При клике на карточку переходим на страницу компаниона
// TODO: При клике на на минус на карточке вызываем попап
// TODO: Что происходит при клике на конверт?
// TODO: Что происходит при клике на сообщение?
// TODO: Определиться с рассылкой инвайтов.
// TODO: Скрыть кнопку Show All при поиске и если мало друзей, а при активности изменить надпись на hide.

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
        removeCompanion,
        showAllCompanions,
        select,
        selectCompanions,
    } = useCompanions();

    const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        setCheckedMap((prev) => ({
            ...prev,
            [id]: isChecked,
        }));
    };

    const deleteCheckedCards = () => {
        Object.entries(checkedMap).forEach(([id, isChecked]) => {
            if (isChecked) {
                removeCompanion(id);
            }
        });
        setCheckedMap({});
    };

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
                    <Button
                        resetDefaultStyles
                        className={classes.buttonText && !select ? classes.buttonTextSelect : classes.buttonText}
                        onClick={showAllCompanions}
                    >
                        Show all companions
                    </Button>

                    {select && (
                        <div className={classes.buttonsDelAndInvite}>
                            <Button onClick={() => console.log("Send invitations")}>Отправить инвайты</Button>
                            <Button onClick={() => console.log("Delete companions")}>Удалить компанионов</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Companions;
