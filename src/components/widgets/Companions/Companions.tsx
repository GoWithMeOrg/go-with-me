"use client";

import { FC } from "react";

import { Title } from "@/components/shared/Title";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { FilteredList } from "@/components/shared/FilteredList/FilteredList";
import { Avatar } from "@/components/shared/Avatar";
import { Span } from "@/components/shared/Span";
import { useCompanions } from "./hooks/useCompanions";

import classes from "./Companions.module.css";

export const Companions: FC = () => {
    // добавить индекс в дб прода db.getCollection('users').createIndex({ name: 1 })
    const { handleFirstNameChange, handleLastNameChange, handleEmailChange, findUsers } = useCompanions();
    console.log(findUsers);

    return (
        <div className={classes.searchCompanions}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Найти компаньонов" />
            </div>

            <div className={classes.line}></div>

            <div className={classes.filters}>
                <Label label={"First Name"}>
                    <Input onChange={handleFirstNameChange} />
                </Label>

                <Label label={"Last Name"}>
                    <Input onChange={handleLastNameChange} />
                </Label>

                <Label label={"Email"}>
                    <Input onChange={handleEmailChange} />
                </Label>
            </div>

            <FilteredList className={classes.filteredList}>
                {findUsers?.length === 0 ? (
                    <Span title={"По вашему запросу ничего не найдено"} />
                ) : (
                    findUsers.map((card: any) => (
                        <div key={card._id}>
                            <Avatar name={card.name} image={card.image} scale={1.8} id={card._id} />
                            <Span title={card.name} />
                        </div>
                    ))
                )}
            </FilteredList>
        </div>
    );
};
