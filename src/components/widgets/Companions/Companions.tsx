"use client";

import { FC } from "react";

import { Title } from "@/components/shared/Title";
import { Label } from "@/components/shared/Label";
import { Input } from "@/components/shared/Input";
import { useCompanions } from "./hooks/useCompanions";

import classes from "./Companions.module.css";

export const Companions: FC = () => {
    const { handleFirstNameChange, handleLastNameChange, handleEmailChange, data } = useCompanions();
    console.log(data);
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
            {/* {data && <div>{data?.userByEmail?.name}</div>} */}
        </div>
    );
};
