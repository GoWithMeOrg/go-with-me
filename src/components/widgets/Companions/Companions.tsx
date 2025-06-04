"use client";

import { FC } from "react";

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

import classes from "./Companions.module.css";
import { CardCompanion } from "../CardCompanion";
import { Button } from "@/components/shared/Button";

export const Companions: FC = () => {
    const { handleInputChange, findUsers, companions, called, companionRequest, searchValue, clearInput } =
        useCompanions();

    return (
        <div className={classes.searchCompanions}>
            <div className={classes.header}>
                <Title tag={"h3"} title="Find new companions" />
            </div>

            <div className={classes.filters}>
                <Label label={"Search by name or email"} className={classes.findCompanions}>
                    <Input
                        onChange={handleInputChange}
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

                <div className={classes.filters}>
                    <Label label={""} className={classes.findCompanions}>
                        <Input
                            onChange={handleInputChange}
                            type="text"
                            className={classes.findInput}
                            value={searchValue ?? ""}
                        />
                        {searchValue === "" && <Search className={classes.searchIconCompanions} />}

                        {searchValue !== "" && (
                            <ClearInput className={classes.searchIconCompanions} onClick={clearInput} />
                        )}
                    </Label>
                </div>

                <FilteredList className={classes.companionsList}>
                    {companions?.map((card: any) => (
                        <CardCompanion id={card._id} name={card.name} image={card.image} key={card._id} />
                    ))}
                </FilteredList>
            </div>
        </div>
    );
};
