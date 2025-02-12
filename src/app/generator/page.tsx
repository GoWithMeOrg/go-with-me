"use client";

import React from "react";
import { NextPage } from "next";
import { Input } from "@/components/shared/Input";

import classes from "./page.module.css";
import { Label } from "@/components/shared/Label";

const Generator: NextPage = () => {
    return (
        <div className={classes.generator}>
            <h3>Генератор случайных событий</h3>
            <Label label="Укажите количество событий">
                <Input />
            </Label>
        </div>
    );
};

export default Generator;
