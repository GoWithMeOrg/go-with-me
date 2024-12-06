"use client";

import type { NextPage } from "next";

import { Title } from "@/components/shared/Title";
import { Slider } from "@/components/shared/Slider";

import classes from "./page.module.css";

const EventListPage: NextPage = () => {
    return (
        <div className={classes.eventListPage}>
            <Title tag={"h1"} title="Join the adventure" className={classes.title} />
            <Slider />
        </div>
    );
};

export default EventListPage;
