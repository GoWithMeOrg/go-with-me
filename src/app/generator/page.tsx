"use client";
import React from "react";
import { NextPage } from "next";

import GeneratorEvents from "@/components/widgets/GeneratorEvents/GeneratorEvents";

import classes from "./page.module.css";

const Generator: NextPage = () => {
    return (
        <div className={classes.generator}>
            <GeneratorEvents />
        </div>
    );
};

export default Generator;
